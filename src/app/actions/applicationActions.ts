
'use server';

import { db } from '@/lib/firebase/admin';
import { z } from 'zod';

// Basic schema for storing the raw data from the form
const ApplicationSchema = z.object({
    type: z.string(),
    applicantName: z.string(),
    // We will store the rest of the form data as a JSON string.
    // In a real production app, you would define the full schema for each form type.
    data: z.string(), 
    // Capturing userId will be important and now we mandate it from the forms
    userId: z.string().min(1, "User ID must be provided."),
});

export interface ApplicationSubmissionState {
    success: boolean;
    message?: string;
    applicationId?: string;
    error?: string | null;
}

export async function saveApplication(
    formData: FormData
): Promise<ApplicationSubmissionState> {
    const rawData = {
        type: formData.get('type'),
        applicantName: formData.get('applicantName'),
        data: formData.get('data'),
        userId: formData.get('userId'),
    };

    const validatedFields = ApplicationSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            success: false,
            error: 'Invalid application data provided. ' + validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        let parsedData = {};
        try {
            parsedData = JSON.parse(validatedFields.data.data);
        } catch (error) {
            console.error("Could not parse form data JSON string:", error);
            return {
                success: false,
                error: "Internal server error: Could not process form data."
            }
        }

        const applicationData = {
            type: validatedFields.data.type,
            applicantName: validatedFields.data.applicantName,
            userId: validatedFields.data.userId,
            data: parsedData, // Store the parsed JSON object
            // Add server-side generated fields
            status: 'Pending', // Default status
            date: new Date().toISOString(),
        };

        const docRef = await db.collection('applications').add(applicationData);

        return {
            success: true,
            message: 'Application submitted successfully!',
            applicationId: docRef.id,
        };
    } catch (error) {
        console.error('Firestore submission error:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown server error occurred.';
        return {
            success: false,
            error: `Failed to save application: ${errorMessage}`,
        };
    }
}

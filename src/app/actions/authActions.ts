
'use server'

import { initializeFirebaseAdmin } from '@/lib/firebase/admin';
import { z } from 'zod'

const SignUpSchema = z.object({
  applicantName: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits.' }).regex(/^\+?[0-9\s-()]+$/, { message: 'Invalid phone number format.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

export interface AuthState {
  message: string | null;
  errors?: {
    applicantName?: string[];
    email?: string[];
    phone?: string[];
    password?: string[];
    general?: string[]; 
  } | null;
  success: boolean;
  redirectTo?: string | null;
  uid?: string;
}

export async function signUpWithEmail(
  prevState: AuthState, 
  formData: FormData
): Promise<AuthState> {
  const { auth, db } = initializeFirebaseAdmin();

  const validatedFields = SignUpSchema.safeParse({
    applicantName: formData.get('applicantName'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data. Please check the fields below.',
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const { applicantName, email, phone, password } = validatedFields.data;

  try {
    // 1. Create the user in Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: applicantName,
      phoneNumber: phone,
      emailVerified: false, 
    });

    // 2. Create the user document in Firestore
    await db.collection('users').doc(userRecord.uid).set({
      uid: userRecord.uid,
      name: applicantName,
      email: email,
      phone: phone,
      role: 'Applicant', // Default role for new users
      createdAt: new Date().toISOString(),
    });


    return {
      message: 'Sign up successful! You can now log in.',
      success: true,
      redirectTo: `/login?name=${encodeURIComponent(userRecord.displayName || email.split('@')[0])}`,
      errors: null,
    };

  } catch (error: any) {
    let errorMessage = 'Could not sign up. Please try again.';
    if (error.code === 'auth/email-already-exists') {
      errorMessage = 'An account with this email address already exists.';
    } else if (error.message) {
      errorMessage = error.message;
    }
    return {
      message: errorMessage,
      errors: { general: [errorMessage] },
      success: false,
    };
  }
}

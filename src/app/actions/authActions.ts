
'use server'

import { auth } from '@/lib/firebase/admin';
import { z } from 'zod'

const SignUpSchema = z.object({
  applicantName: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits.' }).regex(/^\+?[0-9\s-()]+$/, { message: 'Invalid phone number format.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

export interface SignUpState {
  message: string | null;
  errors?: {
    applicantName?: string[];
    email?: string[];
    phone?: string[];
    password?: string[];
    general?: string[]; // For errors not specific to a field
  } | null;
  success: boolean;
  redirectTo?: string | null;
  pendingConfirmation?: boolean;
}

export async function signUpWithEmail(
  prevState: SignUpState | null, 
  formData: FormData
): Promise<SignUpState> {

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
    await auth.createUser({
      email,
      password,
      displayName: applicantName,
      phoneNumber: phone,
      emailVerified: false, // Set to false, Firebase sends a verification email by default if enabled
    });

    // In a real app, you'd likely want to send a verification email.
    // For this prototype, we will assume auto-verification or proceed as if verified.
    
    return {
      message: 'Sign up successful! Please check your email for verification. For now, you can proceed to login.',
      success: true,
      redirectTo: `/login`, // Redirect to login page after signup
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

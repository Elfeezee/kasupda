
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
  const { auth } = initializeFirebaseAdmin();

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
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: applicantName,
      phoneNumber: phone,
      emailVerified: false, 
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


const LoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(1, { message: 'Password cannot be empty.' }),
});


export async function loginWithEmail(
  options: { redirectTo?: string },
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {

  // This is a server action, it should not use client-side Firebase SDK.
  // This function is now a placeholder. The actual logic is on the client-side
  // in /login/page.tsx which uses the Firebase client SDK for auth.
  // We return a generic response. The redirection and state handling will be managed
  // on the client upon successful authentication via the Firebase client SDK.
  
  const redirectTo = options.redirectTo || '/dashboard';
  
  // This server action doesn't perform the login, so we just prep the client
  return {
      message: 'Client-side login will be attempted.',
      success: false, // It's not successful until the client says so
      redirectTo: redirectTo,
      errors: null,
  };
}



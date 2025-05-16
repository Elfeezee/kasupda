
'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { z } from 'zod'
import type { ZodIssue } from 'zod';

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
  const supabase = createSupabaseServerClient();

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

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: applicantName, // This will be stored in raw_user_meta_data
        phone: phone,             // This will also be stored in raw_user_meta_data
      },
      // If you want to redirect users to a specific page after email confirmation:
      // emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    return {
      message: error.message || 'Could not sign up. Please try again.',
      errors: { general: [error.message || 'An unknown error occurred.'] },
      success: false,
    };
  }

  if (data.user) {
    if (data.session) {
      // User is signed up and logged in (auto-confirm likely enabled in Supabase settings)
      return {
        message: 'Sign up successful! Redirecting to your dashboard...',
        success: true,
        redirectTo: `/dashboard?name=${encodeURIComponent(applicantName)}`,
        errors: null,
      };
    } else if (data.user && !data.session) {
      // Email confirmation is likely required
      return {
        message: 'Sign up successful! Please check your email to confirm your account.',
        success: true,
        pendingConfirmation: true,
        errors: null,
      };
    }
  }
  
  // Fallback for unexpected cases, though ideally one of the above conditions should be met.
  return {
    message: 'Sign up process initiated. Further steps may be required if not redirected or prompted for email confirmation.',
    success: true, 
    errors: null,
  };
}

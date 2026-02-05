import { z } from 'zod';

// Simulated async validation function to check if email is unique
const checkEmailUniqueness = async (email: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const existingEmails = ['test@example.com', 'admin@example.com'];
      resolve(!existingEmails.includes(email.toLowerCase()));
    }, 1000);
  });
};

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(1, 'Full name is required')
      .min(2, 'Full name must be at least 2 characters'),
    
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email format')
      .refine(
        async (email) => {
          return await checkEmailUniqueness(email);
        },
        {
          message: 'This email is already registered',
        }
      ),
    
    phone: z
      .string()
      .min(1, 'Phone number is required')
      .regex(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        'Invalid phone number format'
      ),
    
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)/,
        'Password must contain both letters and numbers'
      ),
    
    confirmPassword: z
      .string()
      .min(1, 'Please confirm your password'),
    
    terms: z
      .boolean()
      .refine((val) => val === true, {
        message: 'You must accept the terms and conditions',
      }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

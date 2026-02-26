import z from 'zod'

export const createUserLoginSchema = z.object({
  mobile: z
    .string()
    .trim()
    .min(10, "Mobile number must be 10 digits")
    .max(10, "Mobile number must be 10 digits")
    .regex(/^[6-9]\d{9}$/, "Enter a valid mobile number"),
})

export type createUserLoginFormData = z.infer<typeof createUserLoginSchema>


// OTP DATA

export const otpSchema = z.object({
  mobile: z.string().length(10),
  otp: z.string().length(4, 'Please enter your otp code.'),
})

export type OtpFormData = z.infer<typeof otpSchema>

//Registration Data

export const registrationSchema = z.object({
  mobile: z.string().length(10),

  otp: z
    .string()
    .length(4, "Please enter your OTP code."),
    
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long")
    .trim(),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")), // allows empty string
  
});


export type registrationFormData = z.infer<typeof registrationSchema>
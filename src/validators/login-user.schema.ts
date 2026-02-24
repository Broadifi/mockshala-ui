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
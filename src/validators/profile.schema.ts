import { z } from "zod";

export const profileSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  
  email: z
    .string()
    .email("Invalid email address")
    .optional()
    .or(z.literal("")),
  
  mobile: z
    .string()
    .regex(/^[0-9]{10}$/, "Mobile must be 10 digits"),
  
  dob: z
    .string()
    .min(1, "Date of birth is required")
    .refine(
      (date) => !isNaN(Date.parse(date)),
      "Invalid date format"
    ),
  
  gender: z
    .string()
    .min(1, "Gender is required"),
  
  line1: z
    .string()
    .min(1, "Address Line 1 is required")
    .max(255, "Address Line 1 must not exceed 255 characters"),
  
  line2: z
    .string()
    .min(1, "Address Line 2 is required")
    .max(255, "Address Line 2 must not exceed 255 characters"),
  
  city: z
    .string()
    .min(1, "City is required")
    .max(100, "City must not exceed 100 characters"),
  
  state: z
    .string()
    .min(1, "State is required")
    .max(100, "State must not exceed 100 characters"),
  
  pinCode: z
    .number()
    .min(10000, "Pincode must be 5-6 digits")
    .max(999999, "Pincode must be 5-6 digits"),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
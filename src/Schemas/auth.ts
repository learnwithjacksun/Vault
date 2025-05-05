import { z } from "zod";

export const newUserSchema = z.object({
  passcode: z.string().min(1, { message: "Passcode is required" }).min(6).max(6),
  confirmPasscode: z.string().min(1, { message: "Confirm passcode is required" }).min(6).max(6),
  securityQuestion: z.string().min(1, { message: "Security question is required" }),
  securityAnswer: z.string().min(1, { message: "Security answer is required" }),
}).refine((data) => data.passcode === data.confirmPasscode, {
  path: ["confirmPasscode"],
  message: "Passcodes do not match",
});

export const loginSchema = z.object({
  passcode: z.string().min(1, { message: "Passcode is required" }).min(6).max(6),
});


export const recoverSchema = z.object({
  securityQuestion: z.string().min(1, { message: "Security question is required" }),
  securityAnswer: z.string().min(1, { message: "Security answer is required" }),
});





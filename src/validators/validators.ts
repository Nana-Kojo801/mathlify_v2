import { z } from "zod";

export const signupSchema = z.object({
    username: z.string().min(1, { message: "Username is required" }).max(20, { message: "Username must be less than 20 characters"}),
    email: z.string().email(),
    password: z.string().min(1, { message: "Password is required" })
})

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, { message: "Password is required" })
})

export const practiceSchema = z.object({
    range: z.object({
        from: z.number().min(1, "Range should be greater than or equal to one"),
        to: z.number().min(1, "Range should be greater than or equal to one")
    }),
    quantity: z.object({
        min: z.number().min(1, "Quantity should be greater than or equal to one"),
        max: z.number().min(1, "Quantity should be greater than or equal to one")
    }),
    interval: z.number().positive().nonnegative(),
    timer: z.number().min(1, "Timer should be greater than 1s")
})
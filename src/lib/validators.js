import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().trim().min(2).max(80).optional().or(z.literal("")),
  email: z.string().trim().email(),
  password: z.string().min(8).max(64),
});

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8).max(64),
});

export const locationSchema = z.object({
  name: z.string().trim().min(2).max(120),
  googleReviewUrl: z.string().trim().url(),
  redirectThreshold: z.coerce.number().int().min(1).max(5),
});

export const feedbackSchema = z.object({
  rating: z.coerce.number().int().min(1).max(5),
  name: z.string().trim().max(100).optional().or(z.literal("")),
  message: z.string().trim().min(3).max(1000),
});

export const ratingSchema = z.object({
  rating: z.coerce.number().int().min(1).max(5),
});

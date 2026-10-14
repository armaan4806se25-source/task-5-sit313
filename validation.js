import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
});

export const signUpSchema = z
  .object({
    firstName: z.string().trim().min(1, "First name is required."),
    lastName: z.string().trim().min(1, "Last name is required."),
    email: z.string().trim().email("Enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(1, "Confirm your password."),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

// Turns Zod issues into { fieldName: "message" }
export function toFieldErrors(error) {
  const out = {};
  error.issues.forEach((i) => {
    if (!out[i.path[0]]) out[i.path[0]] = i.message;
  });
  return out;
}

// ---------- New Post page ----------
const tagsField = z
  .string()
  .trim()
  .min(1, "Add at least one tag.")
  .refine(
    (v) => {
      const tags = v.split(",").map((t) => t.trim()).filter(Boolean);
      return tags.length >= 1 && tags.length <= 5;
    },
    "Enter between 1 and 5 tags, separated by commas."
  )
  .refine(
    (v) =>
      v.split(",").map((t) => t.trim()).filter(Boolean)
        .every((t) => /^[a-zA-Z0-9+#.\- ]{1,20}$/.test(t)),
    "Each tag must be 1-20 characters (letters, numbers, + # . - only)."
  );

export const questionSchema = z.object({
  title: z.string().trim().min(10, "Title must be at least 10 characters.").max(120, "Title must be 120 characters or fewer."),
  problem: z.string().trim().min(30, "Describe your problem in at least 30 characters.").max(5000, "Description is too long (max 5000 characters)."),
  tags: tagsField,
});

export const articleSchema = z.object({
  title: z.string().trim().min(10, "Title must be at least 10 characters.").max(120, "Title must be 120 characters or fewer."),
  abstract: z.string().trim().min(30, "Abstract must be at least 30 characters.").max(300, "Abstract must be 300 characters or fewer."),
  body: z.string().trim().min(100, "Article text must be at least 100 characters.").max(20000, "Article text is too long (max 20000 characters)."),
  tags: tagsField,
});

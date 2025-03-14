"use server";
import { z } from "zod";

const checkEmail = (email: string) => email.endsWith("@zod.com");

const formSchema = z.object({
  username: z.string().min(5, "Username should be at least 5 characters long."),
  email: z
    .string()
    .email()
    .refine(checkEmail, "Only @zod.com emails are allowed"),
  password: z
    .string()
    .min(10, "Password should be at least 10 characters long.")
    .refine(
      (password) => /\d/.test(password),
      "Password should contain at least one number (0123456789)"
    ),
});

export const handleForm = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    return console.log(result.data);
  }
};

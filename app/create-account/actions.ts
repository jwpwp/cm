"use server";
import bcrypt from "bcrypt";
import db from "@/lib/db";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "../../lib/constants";
import { z } from "zod";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";

const checkEmail = (email: string) => email.endsWith("@zod.com");

const formSchema = z
  .object({
    username: z
      .string()
      .min(5, "Username should be at least 5 characters long.")
      .toLowerCase()
      .trim(),
    email: z
      .string()
      .email()
      .toLowerCase()
      .refine(checkEmail, "Only @zod.com emails are allowed"),
    password: z
      .string()
      .min(
        PASSWORD_MIN_LENGTH,
        "Password should be at least 10 characters long."
      )
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: { username },
      select: { id: true },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This username is already taken.",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: { email },
      select: { id: true },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This email is already taken.",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  });

export const createAccount = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: { id: true },
    });

    const session = await getSession();
    session.id = user.id;
    await session.save();
    redirect("/profile");
  }
};

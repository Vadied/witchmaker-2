"use server";

import { z } from "zod";
import { redirect } from "next/navigation";

import connect from "@/lib/db/database";
import { createSlug } from "@/lib/utils";

import { FormState } from "@/models/response.model";
import { User } from "@/schemas/User";

const getSlug = async (): Promise<string> => {
  const slug = createSlug();
  const count = await User.countDocuments({ slug });
  if (!Number(count)) return slug;

  return getSlug();
};

const FormSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string({
    invalid_type_error: "Please insert a name.",
  }),
  surname: z.string(),
  email: z.string().email("Please insert a valid email."),
  password: z.string(),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const CreateUser = FormSchema.omit({
  id: true,
  slug: true,
  status: true,
  createdAt: true,
  updatedAt: true,
});

export const createUser = async (prevState: FormState, formData: FormData) => {
  // Validate form fields using Zod
  const validatedFields = CreateUser.safeParse({
    name: formData.get("name"),
    surname: formData.get("surname"),
    password: formData.get("password"),
    email: formData.get("email"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create user.",
    };
  }

  // Prepare data for insertion into the database
  const { name, surname, password, email } = validatedFields.data;
  const date = new Date().toISOString().split("T")[0];
  try {
    await connect();
    const slug = await getSlug();
    const user = await User.create({
      slug,
      name,
      surname,
      password,
      email,
      createdAt: date,
      updatedAt: date,
    });
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log("catch", error);
    return {
      message: "Database Error: Failed to Create User.",
    };
  }
  
  redirect("/campaigns");
};

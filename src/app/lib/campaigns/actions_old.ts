"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { FormState, Reference } from "@/models/response.model";

import { createSlug } from "@/app/lib/utils";

const FormSchema = z.object({
  id: z.string(),
  name: z.string({
    invalid_type_error: "Please insert a name.",
  }),
  slug: z.string(),
  description: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  master: z.string(),
});

const CreateCampaign = FormSchema.omit({
  id: true,
  slug: true,
  description: true,
  start_date: true,
  end_date: true,
  status: true,
  createdAt: true,
  updatedAt: true,
});

const UpdateCampaign = FormSchema.omit({
  id: true,
  slug: true,
  createdAt: true,
  updatedAt: true,
});

const getSlug = async (): Promise<string> => {
  const slug = createSlug();
  const count =
    await sql`SELECT COUNT(*) FROM campaigns WHERE slug = '${slug}'`;
  if (!Number(count.rows[0].count)) return slug;

  return getSlug();
};

export const createCampaign = async (prevState: FormState, formData: FormData) => {
  // Validate form fields using Zod
  const validatedFields = CreateCampaign.safeParse({
    name: formData.get("name"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create campaign.",
    };
  }

  // Prepare data for insertion into the database
  const { name } = validatedFields.data;
  // TODO dinamico
  const master = "ca6260f9-a55e-40be-99e6-56ab5f5d441f"; 
  const date = new Date().toISOString().split("T")[0];
  try {
    const slug = await getSlug();
    await sql`
    INSERT INTO campaigns (name, createdAt, updatedAt, master, slug)
    VALUES (${name}, ${date}, ${date}, ${master}, ${slug})
  `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to Create Invoice.",
    };
  }

  revalidatePath("/campaigns");
  redirect("/campaigns");
};

export const updateCampaign = async (
  ref: Reference,
  prevState: FormState,
  formData: FormData
) => {
  // Validate form fields using Zod
  const validatedFields = UpdateCampaign.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    start_date: formData.get("start_date"),
    end_date: formData.get("end_date"),
    status: formData.get("status"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update campaign.",
    };
  }

  // Prepare data for insertion into the database
  const { name, description, start_date, end_date, status } =
    validatedFields.data;
  const date = new Date().toISOString().split("T")[0];
  try {
    await sql`
    UPDATE campaigns 
    SET name = ${name}, description = ${description}, start_date = ${start_date}, end_date = ${end_date}, status = ${status}, updatedAt = ${date}
    WHERE id = ${ref.id}
  `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Update Invoice.",
    };
  }

  revalidatePath("/campaigns/[[...slug]]");
  redirect("/campaigns/[[...slug]]");
};

export const deleteInvoice = async (id: string) => {
  try {
    await sql`DELETE FROM campaigns WHERE id = ${id}`;
    revalidatePath("/campaigns");
    return { message: "Deleted Campaign" };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Campaign." };
  }
};

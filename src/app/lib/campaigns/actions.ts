"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import connect from "@/app/lib/db/database";
import { createSlug } from "@/app/lib/utils";

import { Campaign } from "@/models/campaign.model";
import { FormState, Reference } from "@/models/response.model";

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
  master: true,
});

const UpdateCampaign = FormSchema.omit({
  id: true,
  slug: true,
  createdAt: true,
  updatedAt: true,
  master: true,
});

const getSlug = async (): Promise<string> => {
  const slug = createSlug();
  const count = await Campaign.countDocuments({ slug });
  if (!Number(count)) return slug;

  return getSlug();
};

export const createCampaign = async (
  prevState: FormState,
  formData: FormData
) => {
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
  const master = "654a5261d57c7929936284e4";
  const date = new Date().toISOString().split("T")[0];
  try {
    await connect();
    const slug = await getSlug();
    await Campaign.create({
      name,
      slug,
      description: "",
      start_date: date,
      master,
      createdAt: date,
      updatedAt: date,
    });
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to Create Campaign.",
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
    await connect();
    await Campaign.updateOne(
      { _id: ref._id },
      {
        name,
        description,
        start_date,
        end_date,
        status,
        updatedAt: date,
      }
    );
  } catch (error) {
    return {
      message: "Database Error: Failed to Update Campaign.",
    };
  }

  revalidatePath(`/campaigns/${ref.slug}`);
  redirect(`/campaigns/${ref.slug}`);
};

export const deleteCampaign = async (_id: string) => {
  try {
    await connect();
    await Campaign.deleteOne({ _id });

    revalidatePath("/campaigns");
    return { message: "Deleted Campaign" };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Campaign." };
  }
};

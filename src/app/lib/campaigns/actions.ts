"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
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
  description: true,
  start_date: true,
  end_date: true,
  status: true,
  createdAt: true,
  updatedAt: true,
});

export async function createCampaign(formData: FormData) {
  const { name, master } = CreateCampaign.parse({
    name: formData.get("name"),
    master: formData.get("master"),
  });
  const date = new Date().toISOString().split("T")[0];
  await sql`
    INSERT INTO campaigns (name, createdAt, updatedAt, master)
    VALUES (${name}, ${date}, ${date}, ${master})
  `;

  revalidatePath("/campaigns");
  redirect("/campaigns");
}

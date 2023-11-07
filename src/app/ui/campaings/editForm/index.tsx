"use client";

import Link from "next/link";
import { useFormState } from "react-dom";

import style from "./style.module.css";

import { FormState } from "@/models/response.model";

import { updateCampaign } from "@/app/lib/campaigns/actions";

import Button from "@/app/ui/button";
import Input from "@/app/ui/Input";

type Props = {
  _id: string;
  slug: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  status: string;
};
export default function CreateForm({
  _id,
  slug,
  name,
  description,
  start_date,
  end_date,
  status,
}: Props) {
  const initialState: FormState = { message: null, errors: {} };
  const updateWithRef = updateCampaign.bind(null, {
    _id: _id,
    slug: slug,
  });
  const [state, dispatch] = useFormState(updateWithRef, initialState);

  return (
    <form action={dispatch} className={style.form}>
      <div className={style.inputs}>
        <Input
          label="Name"
          name="name"
          value={name}
          placeholder="Insert name"
          errors={state.errors}
        />
        <Input
          label="Description"
          name="description"
          value={description}
          placeholder="Insert description"
          errors={state.errors}
        />
        <Input
          label="Start Date"
          name="start_date"
          value={start_date}
          placeholder="Insert Start Date"
          errors={state.errors}
        />
        <Input
          label="End Date"
          name="end_date"
          value={end_date}
          placeholder="Insert End Date"
          errors={state.errors}
        />
        <Input
          label="Status"
          name="status"
          value={status}
          placeholder="Insert status"
          errors={state.errors}
        />
      </div>

      <div className={style.actions}>
        <Link href={`/campaigns/${slug}`}>
          <Button type="secondary">Cancel</Button>
        </Link>
        <button type="submit">
          <Button>Update Campaign</Button>
        </button>
      </div>
    </form>
  );
}

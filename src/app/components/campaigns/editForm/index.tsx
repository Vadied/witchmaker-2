"use client";

import Link from "next/link";
import { useFormState } from "react-dom";

import style from "./style.module.css";

import { FormState } from "@/models/response.model";
import { Campaign } from "@/models/campaign.model";

import { updateCampaign } from "@/app/lib/campaigns/actions";

import Button from "@/app/components/button";
import Input from "@/app/components/Input";

type Props = {
  campaign: Campaign;
};
export default function CreateForm({ campaign }: Props) {
  const initialState: FormState = { message: null, errors: {} };
  const updateWithRef = updateCampaign.bind(null, {
    id: campaign.id,
    slug: campaign.slug,
  });
  const [state, dispatch] = useFormState(updateWithRef, initialState);

  return (
    <form action={dispatch} className={style.form}>
      <div className={style.inputs}>
        <Input
          label="Name"
          name="name"
          placeholder="Insert name"
          errors={state.errors}
        />
        <Input
          label="Description"
          name="description"
          placeholder="Insert description"
          errors={state.errors}
        />
        <Input
          label="Start Date"
          name="start_date"
          placeholder="Insert Start Date"
          errors={state.errors}
        />
        <Input
          label="End Date"
          name="end_date"
          placeholder="Insert End Date"
          errors={state.errors}
        />
        <Input
          label="Status"
          name="status"
          placeholder="Insert status"
          errors={state.errors}
        />
      </div>

      <div className={style.actions}>
        <Button type="secondary">
          <Link href={`/campaigns/${campaign.slug}`}>Cancel</Link>
        </Button>
        <Button>
          <button type="submit">Update Campaign</button>
        </Button>
      </div>
    </form>
  );
}

"use client";

import Link from "next/link";
import { useFormState } from "react-dom";

import style from "./style.module.css";

import { FormState } from "@/models/response.model";

import { createCampaign } from "@/lib/campaigns/actions";

import Button from "@/ui/button";
import Input from "@/ui/Input";

export default function CreateForm() {
  const initialState: FormState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createCampaign, initialState);

  return (
    <form action={dispatch} className={style.form}>
      <div className={style.inputs}>
        <Input
          label="Name"
          name="name"
          placeholder="Insert name"
          errors={state.errors}
        />
      </div>

      <div className={style.actions}>
        <Button type="secondary">
          <Link href="/campaigns">Cancel</Link>
        </Button>
        <Button>
          <button type="submit">Create Campaign</button>
        </Button>
      </div>
    </form>
  );
}

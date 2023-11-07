"use client";

import Link from "next/link";
import { useFormState } from "react-dom";

import style from "./style.module.css";

import { createCampaign } from "@/app/lib/campaigns/actions";

import { FormState } from "@/models/response.model";

import Button from "@/app/components/button";
import Input from "@/app/components/Input";

type Props = {
  confirmLabel: string;
  oldUrl: string;
};
export default function Form({ confirmLabel, oldUrl }: Props) {
  const initialState: FormState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createCampaign, initialState);

  return (
    <form action={dispatch} className={style.form}>
      <div className={style.inputs}>
        <Input
          label="Name"
          name="name"
          placeholder="Inserisci nome"
          errors={state.errors}
        />
      </div>

      <div className={style.actions}>
        <Button type="secondary">
          <Link href={oldUrl}>Cancel</Link>
        </Button>
        <Button>
          <button type="submit">{confirmLabel}</button>
        </Button>
      </div>
    </form>
  );
}

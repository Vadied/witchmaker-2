"use client";

import Link from "next/link";
import { useFormState } from "react-dom";

import { createCampaign } from "@/app/lib/campaigns/actions";

import { FormState } from "@/models/response.model";

import Button from "@/app/components/button";
import Input from "@/app/components/Input";

type Props = {};
export default function Form({}: {}) {
  const initialState: FormState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createCampaign, initialState);

  return (
    <form action={dispatch}>
      <Input label="name" name="name" placeholder="Inserisci nome" errors={state.errors} />

      
      <div className="style.actions">
        <Link href="/campaigns">Cancel</Link>
        <Button type="submit">Create Invoice</Button>
      </div>
    </form>
  );
}

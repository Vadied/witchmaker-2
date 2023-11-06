"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

import Button from "@/app/components/button";
import { createCampaign } from "@/app/lib/campaigns/actions";

type Props = {};
export default function Form({}: {}) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createCampaign, initialState);

  return (
    <form action={dispatch}>
      
      <div className="style.actions">
        <Link href="/campaigns">Cancel</Link>
        <Button type="submit">Create Invoice</Button>
      </div>
    </form>
  );
}

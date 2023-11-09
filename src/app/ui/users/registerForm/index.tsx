"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import style from "./style.module.css";

import { FormState } from "@/app/models/response.model";

import { createUser } from "@/app/lib/users/actions";

import Button from "@/app/ui/button";
import Input from "@/app/ui/Input";

export default function RegisterForm() {
  const initialState: FormState = { message: null, errors: {} };
  const { pending } = useFormStatus();
  const [state, action] = useFormState(createUser, initialState);

  console.log("register", state);
  return (
    <form action={action} className={style.form}>
      <h1>Please register your user.</h1>
      <div className={style.inputs}>
        <Input
          label="Name"
          name="name"
          placeholder="Enter your email address"
          errors={state.errors}
          required
        />
        <Input
          label="Surname"
          name="surname"
          placeholder="Enter your email address"
          errors={state.errors}
          required
        />
        <Input
          label="Email"
          name="email"
          placeholder="Enter your email address"
          errors={state.errors}
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Enter password"
          errors={state.errors}
          required
        />
      </div>

      <div className={style.actions}>
        <Button type="secondary">
          <Link href="/login">Log in</Link>
        </Button>
        <Button enabled={!pending}>
          <button type="submit">Register</button>
        </Button>
      </div>
    </form>
  );
}
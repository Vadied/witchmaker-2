"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import style from "./style.module.css";

import { authenticate } from "@/lib/auth/actions";

import Button from "@/ui/button";
import Input from "@/ui/Input";

export default function LoginForm() {
  const { pending } = useFormStatus();
  const [isSignedIn, action] = useFormState(authenticate, undefined);

  return (
    <form action={action} className={style.form}>
      <h1>Please log in to continue.</h1>
      <div className={style.inputs}>
        <Input
          label="Email"
          name="email"
          placeholder="Enter your email address"
          required
        />
        <Input
          label="Password"
          name="password"
          placeholder="Enter password"
          required
        />
      </div>
      
      <div className={style.actions}>
        <Button type="secondary">
          <Link href="/register">Register</Link>
        </Button>
        <Button enabled={!pending}>
          <button type="submit">Register</button>
        </Button>
      </div>

      <div className={style.errors}>
        {isSignedIn && (
          <>
            <p aria-live="polite">Invalid credentials</p>
          </>
        )}
      </div>
    </form>
  );
}

"use client";

import { useFormState, useFormStatus } from "react-dom";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import style from "./style.module.css";

import { authenticate } from "@/app/lib/auth/actions";

import LoginButton from "@/app/ui/loginForm/loginButton";
import Input from "../Input";

export default function LoginForm() {
  const [isSignedIn, action] = useFormState(authenticate, undefined);

  return (
    <form action={action} className={style.form}>
      <h1 className={`mb-3 text-2xl`}>Please log in to continue.</h1>
      <div className="w-full">
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
      <LoginButton />
      <div className={style.errors}>
        {isSignedIn && (
          <>
            <ExclamationCircleIcon />
            <p aria-live="polite">Invalid credentials</p>
          </>
        )}
      </div>
    </form>
  );
}

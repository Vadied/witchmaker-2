"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import style from "./style.module.css";

import { FormState } from "@/models/response.model";

import Button from "@/ui/button";
import Input from "@/ui/Input";

export default function RegisterForm() {
  const { pending } = useFormStatus();
  const [state, setState] = useState<FormState>({ message: null, errors: {} });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const username = e.target.username.value;

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, username }),
    });

    if (res.status === 200) {
      const { message } = await res.json();
      setState({ message, errors: {} });
    } else {
      const { errors } = await res.json();
      setState({ message: null, errors });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <h1>Please register your user.</h1>
      <div className={style.inputs}>
        <Input
          label="Username"
          name="username"
          placeholder="Enter your username"
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

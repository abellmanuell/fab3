"use client";
import React, { useActionState, useEffect, useState } from "react";
import Input from "../Input";
import { Key, Mail } from "lucide-react";
import Link from "next/link";
import Button from "../Button";
import { useRouter, useSearchParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { login } from "actions/auth";
import { MdCancel } from "react-icons/md";

export default function LoginForm() {
  const router = useRouter();

  const query = useSearchParams();
  const success = Boolean(query.get("success"));
  const message = query.get("message");

  useEffect(() => {
    if (success && message) {
      toast.error(message);
      router.push("/login");
    }
  }, [success, message]);

  const [state, action, pending] = useActionState(login, undefined);

  return (
    <section className="mb-4  mt-2">
      {/* Handle user errors */}
      {
        <p className="text-pink-500 text-center my-4 flex space-x-2 justify-center items-center">
          {state?.message && (
            <>
              <MdCancel />
              <span>{state.message}</span>
            </>
          )}
        </p>
      }

      <ToastContainer />
      <form action={action} className="space-y-4">
        <Input
          name="email"
          type="email"
          placeholder="Email address"
          icon={Mail}
        />

        {state?.errors?.email && (
          <p className="text-pink-500">{state.errors.email}</p>
        )}

        <Input
          name="password"
          type="password"
          placeholder="Password"
          icon={Key}
        />
        {state?.errors?.password && (
          <p className="text-pink-500">{state.errors.password}</p>
        )}

        <Button isSubmitting={pending}>Sign in</Button>
      </form>

      {/* Forget Password  */}
      <div className="flex justify-end my-2">
        <Link
          href="/forgot-password"
          className="text-sm text-right text-secondary-2 "
        >
          Forgot Password?
        </Link>
      </div>
    </section>
  );
}

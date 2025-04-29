"use client";
import React, { useActionState } from "react";
import Input from "@/components/Input";
import { Key, Mail, User } from "lucide-react";
import Button from "@/components/Button";
import { signup } from "actions/auth";
import { MdCancel } from "react-icons/md";

export default function SignUpForm() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <section className="mb-4 mt-2">
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

      <form action={action} className="space-y-4">
        <Input
          type="text"
          name="nickname"
          placeholder="Enter your nickname"
          icon={User}
        />
        {state?.errors?.nickname && (
          <p className="text-pink-500">{state.errors.nickname}</p>
        )}
        <Input
          type="email"
          name="email"
          placeholder="Email address"
          icon={Mail}
        />
        {state?.errors?.email && (
          <p className="text-pink-500">{state.errors.email}</p>
        )}
        <Input
          type="password"
          name="password"
          placeholder="Create password"
          icon={Key}
        />
        <ul>
          {state?.errors?.password &&
            state.errors.password.map((error) => {
              return (
                <li key={error} className="text-pink-500">
                  {error}
                </li>
              );
            })}
        </ul>
        <Button isSubmitting={pending}>Sign Up Now</Button>
      </form>
    </section>
  );
}

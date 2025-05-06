"use client";
import { Mail, User } from "lucide-react";
import React, { useActionState } from "react";
import Input from "../Input";
import Button from "../Button";

export default function EditUser({ user, editUser }: any) {
  const [state, action, pending] = useActionState<{ message: string }>(
    editUser,
    { message: "" }
  );

  return (
    <>
      <p className="text-green-600 text-center my-4">
        {state && state?.message}
      </p>

      <form action={action} className="space-y-4">
        <Input
          type="text"
          name="nickname"
          placeholder="Enter your nickname"
          icon={User}
          value={user && user?.nickname}
        />

        <Input
          type="email"
          name="email"
          disabled={true}
          placeholder="Enter your email address"
          icon={Mail}
          value={user && user?.email}
          className="opacity-50"
        />

        <Input
          type="hidden"
          name="userId"
          value={user && user?._id}
          className="hidden"
        />
        <Button isSubmitting={pending}>Save</Button>
      </form>
    </>
  );
}

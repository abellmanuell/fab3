"use client";
import { Mail, User } from "lucide-react";
import React, { useActionState } from "react";
import Input from "../Input";
import Button from "../PrimaryButton";

export default function EditUserForm({ userData, updateUserDataAction }: any) {
  const [state, action, pending] = useActionState<{ message: string }>(
    updateUserDataAction,
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
          value={userData && userData?.nickname}
        />

        <Input
          type="email"
          name="email"
          disabled={true}
          placeholder="Enter your email address"
          icon={Mail}
          value={userData && userData?.email}
          className="opacity-50"
        />

        <Input
          type="hidden"
          name="userId"
          value={userData && userData?._id}
          className="hidden"
        />
        <Button isSubmitting={pending}>Save</Button>
      </form>
    </>
  );
}

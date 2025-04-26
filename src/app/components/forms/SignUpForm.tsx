"use client";

import React, { useState } from "react";
import Input from "@/components/Input";
import { Key, Mail, User } from "lucide-react";
import Button from "@/components/Button";
import { signUpAction } from "actions/signUpAction";
import { ToastContainer, toast } from "react-toastify";

export default function SignUpForm() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  interface FormEvent extends React.FormEvent<HTMLFormElement> {}

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setIsSubmitting(true);

    /*********************************************************
     * DATA VALIDATION
     * Validation all the data before sending to backend
     ********************************************************/
    const nickname = formData.get("nickname") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (![nickname, email, password].every(Boolean)) {
      toast.error("Please fill in all fields!");
      setIsSubmitting(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email!");
      setIsSubmitting(false);
      return;
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(password)
    ) {
      toast.error(
        "Password must be at least 8 characters long and contain at least one letter and one number."
      );
      setIsSubmitting(false);

      return;
    }

    /**************************************
     *  Server Action invoke
     * ************************************/
    const user = await signUpAction(formData);

    if (!user.status) {
      toast.error(user.message);
      setIsSubmitting(false);
      return;
    }

    toast.success(user.message);
  }

  return (
    <section className="mb-4 mt-6">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          name="nickname"
          placeholder="Enter your nickname"
          icon={User}
        />
        <Input
          type="email"
          name="email"
          placeholder="Email address"
          icon={Mail}
        />
        <Input
          type="password"
          name="password"
          placeholder="Create password"
          icon={Key}
        />
        <Button isSubmitting={isSubmitting}>Sign Up Now</Button>
      </form>
    </section>
  );
}

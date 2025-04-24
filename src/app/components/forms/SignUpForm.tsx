"use client";

import React from "react";
import Input from "@/components/Input";
import { Key, Mail, User } from "lucide-react";
import Button from "@/components/Button";
import { createUser } from "actions/authAction";
import { ToastContainer, toast } from "react-toastify";

export default function SignUpForm() {
  interface FormEvent extends React.FormEvent<HTMLFormElement> {}

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    /* Data validation */
    const nickname = formData.get("nickname") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (![nickname, email, password].every(Boolean)) {
      toast.error("Please fill in all fields!");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email!");
      return;
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(password)
    ) {
      toast.error(
        "Password must be at least 8 characters long and contain at least one letter and one number."
      );
      return;
    }

    /* Response from Server Action */
    const user = await createUser(formData);

    if (!user.status) {
      toast.error(user.message);
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
        <Button>Sign Up Now</Button>
      </form>
    </section>
  );
}

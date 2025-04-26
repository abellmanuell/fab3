"use client";
import React, { useEffect, useState } from "react";
import Input from "../Input";
import { Key, Mail } from "lucide-react";
import Link from "next/link";
import Button from "../Button";
import { useRouter, useSearchParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { loginAction } from "actions/loginAction";

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
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email!");
      setIsSubmitting(false);
      return;
    }

    /**************************************
     *  Server Action invoke
     * ************************************/
    const user = await loginAction(formData);

    if (!user.status) {
      toast.error(user.message);
      setIsSubmitting(false);
      return;
    }

    toast.success(user.message);
  }

  return (
    <section className="mb-4  mt-6">
      <ToastContainer />

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="email"
          type="email"
          placeholder="Email address"
          icon={Mail}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          icon={Key}
        />

        <Button isSubmitting={isSubmitting}>Sign in</Button>
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

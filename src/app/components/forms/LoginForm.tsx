"use client";
import React, { useEffect } from "react";
import Input from "../Input";
import { Key, Mail } from "lucide-react";
import Link from "next/link";
import Button from "../Button";
import { useRouter, useSearchParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

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

  return (
    <section className="mb-4  mt-6">
      <ToastContainer />

      <form action="" className="space-y-4">
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

        <Button>Sign in</Button>
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

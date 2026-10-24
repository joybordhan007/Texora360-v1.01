"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/field";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Not designed in Figma yet. Will call POST /auth/login on the Go API.
export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  return (
    <div className="flex min-h-screen items-center justify-center bg-page p-4">
      <form
        className="w-full max-w-[400px] space-y-5 rounded-[12px] bg-white p-8 shadow-e1"
        onSubmit={(e) => {
          e.preventDefault();
          const form = new FormData(e.currentTarget);
          if (!form.get("email") || !form.get("password")) return setError("Email and password are required.");
          router.push("/dashboard");
        }}
      >
        <div className="flex items-center gap-2">
          <img src="/figma/logo-mark.svg" alt="" className="h-9" />
          <div>
            <p className="text-[18px] font-semibold text-primary">Texora<span className="text-ink">360</span></p>
            <p className="text-[11px] text-grey-600">ERP Solutions</p>
          </div>
        </div>
        <h1 className="text-[22px] font-semibold text-grey-900">Sign in</h1>
        <label className="block space-y-1.5 text-[14px] font-medium text-grey-800">
          <span>Email</span>
          <Input name="email" type="email" autoComplete="email" placeholder="you@company.com" />
        </label>
        <label className="block space-y-1.5 text-[14px] font-medium text-grey-800">
          <span>Password</span>
          <Input name="password" type="password" autoComplete="current-password" placeholder="••••••••" />
        </label>
        {error && <p className="text-[13px] text-danger">{error}</p>}
        <Button type="submit" size="lg" className="w-full">Sign in</Button>
      </form>
    </div>
  );
}

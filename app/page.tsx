"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check for authentication token
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("bp_auth_token="))
      ?.split("=")[1];

    if (!token) {
      // Redirect to login if not authenticated
      router.push("/login");
    } else {
      // Redirect to dashboard (pitch page as default)
      router.push("/pitch");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-teal-50">
      <div className="text-center">
        <div className="mb-4">
          <Image
            src="/bp-logo.png"
            alt="Boyar Partners"
            width={200}
            height={60}
            className="mx-auto"
            priority
          />
        </div>
        <h1 className="text-2xl font-semibold text-slate-800 mb-2">
          Boyar Partners Dashboard
        </h1>
        <p className="text-slate-600">Loading...</p>
      </div>
    </div>
  );
}

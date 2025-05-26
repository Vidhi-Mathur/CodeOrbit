"use client";
import { signOut } from "next-auth/react";

export default function Logout() {
  return (
    <button onClick={() => signOut({ callbackUrl: "/" })} className="px-5 py-2 bg-white text-[#03357a] rounded-xl font-semibold text-xl border border-[#03357a]">
        Logout
    </button>
  );
}

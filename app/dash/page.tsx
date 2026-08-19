"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { IoIosLogOut } from "react-icons/io";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    }
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/");
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#09090b]">
      <div className="w-full max-w-sm px-8 py-10 rounded-2xl bg-[#18181b] border border-[#27272a]">
        <div className="mb-8">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-zinc-50 tracking-tight">
            Authenticated
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            You are signed in successfully.
          </p>
        </div>

        <div className="bg-[#09090b] border border-[#27272a] rounded-lg px-3 py-2.5 mb-6">
          <p className="text-xs text-zinc-500 mb-0.5">Token</p>
          <p className="text-xs text-zinc-400 font-mono truncate">
            {typeof window !== "undefined" ? localStorage.getItem("token") : ""}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full justify-center bg-[#09090b] border border-[#27272a] text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 rounded-lg py-2.5 text-sm font-medium transition"
        >
          <IoIosLogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </div>
  );
}

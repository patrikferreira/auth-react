"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "../appService";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function validate() {
    const next: { email?: string; password?: string } = {};
    if (!email) next.email = "E-mail is required.";
    else if (!EMAIL_REGEX.test(email)) next.email = "Invalid e-mail.";
    if (!password) next.password = "Password is required.";
    else if (password.length < 6) next.password = "At least 6 characters.";
    return next;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fieldErrors = validate();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setApiError(null);
    setLoading(true);

    try {
      const { token } = await login(email, password);
      localStorage.setItem("token", token);
      router.push("/dash");
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm px-8 py-10 rounded-2xl bg-surface border border-[#27272a]">
      <div className="mb-8">
        <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center mb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-accent"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
            />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-zinc-50 tracking-tight">
          Sign in
        </h1>
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="text-xs font-medium text-zinc-500 tracking-wide"
          >
            E-mail
          </label>
          <input
            type="email"
            id="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((p) => ({ ...p, email: undefined }));
            }}
            className={`bg-[#09090b] border rounded-lg py-2.5 px-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition focus:ring-1 focus:ring-accent focus:border-accent ${errors.email ? "border-red-500/70" : "border-[#27272a]"}`}
          />
          {errors.email && (
            <span className="text-xs text-red-400">{errors.email}</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="password"
            className="text-xs font-medium text-zinc-500 tracking-wide"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((p) => ({ ...p, password: undefined }));
              }}
              className={`w-full bg-[#09090b] border rounded-lg py-2.5 px-3 pr-10 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition focus:ring-1 focus:ring-accent focus:border-accent ${errors.password ? "border-red-500/70" : "border-[#27272a]"}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 transition"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7s4-7 9-7a9.97 9.97 0 015.657 1.757M15 12a3 3 0 11-3.536-2.95M3 3l18 18"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>
          {errors.password && (
            <span className="text-xs text-red-400">{errors.password}</span>
          )}
        </div>

        {apiError && (
          <p className="text-xs text-red-400 text-center -mt-1">{apiError}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-accent text-zinc-950 rounded-lg w-full py-2.5 text-sm font-semibold mt-2 transition hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

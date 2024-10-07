"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FormLogin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      setError(null);
      router.push('/dash')
    } else {
      setError(data.error);
      console.error("Erro de login:", data.error);
    }
  }

  return (
    <div className="p-6 shadow-customShadow solid rounded-xl flex flex-col gap-4 w-80">
      <h1 className="text-3xl font-semibold">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm">
            E-mail
          </label>
          <input
            type="text"
            placeholder="Type your email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="outline-none border py-2 px-4 rounded-lg text-sm"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm">
            Password
          </label>
          <input
            type="password"
            placeholder="Type your password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="outline-none border py-2 px-4 rounded-lg text-sm"
          />
        </div>
        <button className="bg-accent text-lightColor rounded-lg w-full p-2 mt-4 transition-all duration-300 hover:brightness-90">
          Log in
        </button>

        <span className="text-sm flex items-center justify-center h-6">
            {error}
        </span>
      </form>
    </div>
  );
}

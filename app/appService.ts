const API_KEY = process.env.NEXT_PUBLIC_API_KEY ?? "";

export interface LoginResult {
  token: string;
}

export async function login(email: string, password: string): Promise<LoginResult> {
  const response = await fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": API_KEY },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? "Login failed.");
  }

  return data as LoginResult;
}

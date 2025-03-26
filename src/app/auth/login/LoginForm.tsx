"use client";

import { useState } from "react";
import { login } from "./login-action";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
    } catch (err) {
  
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      
      <form onSubmit={handleSubmit} className="content p-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="input input-bordered w-full max-w-xs mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input input-bordered w-full max-w-xs mb-4"
        />
        <button
          type="submit"
          className="btn btn-outline w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
} 
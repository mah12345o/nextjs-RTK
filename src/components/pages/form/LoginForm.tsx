"use client";
import { settingSecureCookies } from "@/app/server-action/action";
import React, { useActionState, useState } from "react";

export const LoginForm = () => {
  const [email, setEmail] = useState("mah@gmail.com");
  const [password, setPassword] = useState("mah");

  const [error, submitAction, isPending] = useActionState(
    async (
      _previousState: string | null,
      formData: FormData
    ): Promise<string | null> => {
      const emailValue = formData.get("email") as string;
      const passwordValue = formData.get("passowrd") as string;

      if (email === emailValue && passwordValue === password) {
        await settingSecureCookies({
          email: emailValue,
          password: passwordValue,
        });
      } else {
        return "Email and password are required";
      }

      return password;
    },
    null
  );

  return (
    <form
      className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
      action={submitAction}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Login
      </h2>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email:
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password:
        </label>
        <input
          name="passowrd"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors duration-200"
      >
        {isPending ? "Logging in..." : "Login"}
      </button>

      {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
    </form>
  );
};

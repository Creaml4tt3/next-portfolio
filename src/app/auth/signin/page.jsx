"use client";
import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleBack = () => {
    window.history.back();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    }).then(async (res) => {
      console.log(res);
      if (res.error) {
        setError(res.error);
      } else {
        handleBack();
      }
    });
  };

  return (
    <div className="AuthContainer flex-center min-h-screen w-full">
      <form
        onSubmit={handleSubmit}
        className="AuthForm flex-center relative w-auto max-w-xs flex-col gap-4 overflow-hidden rounded-xl bg-grey_08 p-6"
      >
        {error && (
          <div className="AuthError flex-center relative w-full rounded-lg bg-red-600 px-4 py-2">
            <span className="AuthErrorText text-center text-xs text-white">
              {error}
            </span>
          </div>
        )}
        <div className="AuthInputContinaer w-full">
          <label htmlFor="Email" className="AuthLabel text-sm text-white">
            Email
          </label>
          <input
            id="Email"
            name="email"
            type="email"
            value={email}
            placeholder="email..."
            onChange={(e) => setEmail(e.target.value)}
            className="AuthInput w-full rounded-lg px-4 py-2"
          />
        </div>
        <div className="AuthInputContinaer w-full">
          <label htmlFor="Password" className="AuthLabel text-sm text-white">
            Password
          </label>
          <input
            id="Password"
            name="password"
            type="password"
            value={password}
            placeholder="password..."
            onChange={(e) => setPassword(e.target.value)}
            className="AuthInput w-full rounded-lg px-4 py-2"
          />
        </div>
        <button
          type="submit"
          className="AuthButton group mt-2 w-full rounded-lg border border-solid border-blue bg-blue px-3 py-2 transition-all duration-300 hover:bg-transparent"
        >
          <span className="AuthButtonText text-white transition-all duration-300 group-hover:text-blue">
            Sign in
          </span>
        </button>
      </form>
    </div>
  );
}

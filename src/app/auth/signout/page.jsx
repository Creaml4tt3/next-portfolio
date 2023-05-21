"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignOut() {
  const router = useRouter();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/signin");
    },
  });

  const handleSubmit = () => {
    signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <div className="AuthSection flex-center min-h-screen w-screen">
      <button
        onClick={() => handleSubmit()}
        className="AuthButton rounded-lg bg-red-600 px-3 py-2"
      >
        <span className="SubmitButtonText text-white">Sign Out</span>
      </button>
    </div>
  );
}

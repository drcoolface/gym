"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const Home = () => {
  const session = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      toast("Successfully signed out!", { type: "success", autoClose: 400 });
      setTimeout(() => {
        router.replace("/login");
      }, 500);
    } catch (err: any) {
      toast(err.message, { type: "error" });
    }
  };

  if (session) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col w-72 min-h-40 bg-white rounded items-center justify-center p-4">
          <h1 className="text-blue-600">Welcome!</h1>
          <h1 className="text-blue-600">You are logged in!</h1>
          <div className="flex flex-col text-black font-extrabold my-4 gap-2">
            <Link href="/plans">Go to plans </Link>
            <Link href="/users">Go to users </Link>

            <button onClick={handleLogout}>Sign out!</button>
          </div>
        </div>
      </div>
    );
  }
};

export default Home;

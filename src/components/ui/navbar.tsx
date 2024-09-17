"use client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import { toast } from "react-toastify";

const Navbar = () => {
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

  const pathname = usePathname();

  if (session.status === "authenticated")
    return (
      <div className="flex justify-center  container mx-auto py-2 ">
        <div className="group w-1/3 px-4  relative text-3xl font-thin">
          <div className=" absolute transition-opacity duration-500 ease-in">
            <span className=" group-hover:opacity-0 ">{`</>`}</span>
          </div>
          <div className=" absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in">
            <span>{`<Hello there!>`}</span>
          </div>
        </div>

        <div className="flex justify-center    w-1/3">
          <div className="flex justify-between gap-4">
            <Link
              href="/"
              className={`${
                pathname === "/" ? "font-bold text-blue-500" : "text-gray-700"
              } transition-all duration-300 ease-in-out transform hover:scale-105`}
            >
              Home
            </Link>
            <Link
              href="/plans"
              className={`${
                pathname === "/plans"
                  ? "font-bold text-blue-500"
                  : "text-gray-700"
              } transition-all duration-300 ease-in-out transform hover:scale-105`}
            >
              Plans
            </Link>
            <Link
              href="/users"
              className={`${
                pathname === "/users"
                  ? "font-bold text-blue-500"
                  : "text-gray-700"
              } transition-all duration-300 ease-in-out transform hover:scale-105`}
            >
              Users
            </Link>
          </div>
        </div>
        <div className=" w-1/3 flex justify-end px-4">
          <button
            onClick={handleLogout}
            className="text-red-500 font-bold hover:text-red-700"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  else return null;
};

export default Navbar;

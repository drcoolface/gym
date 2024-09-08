"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="flex justify-center">
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
            pathname === "/plans" ? "font-bold text-blue-500" : "text-gray-700"
          } transition-all duration-300 ease-in-out transform hover:scale-105`}
        >
          Plans
        </Link>
        <Link
          href="/users"
          className={`${
            pathname === "/users" ? "font-bold text-blue-500" : "text-gray-700"
          } transition-all duration-300 ease-in-out transform hover:scale-105`}
        >
          Users
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

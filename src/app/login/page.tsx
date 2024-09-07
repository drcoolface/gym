"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const router = useRouter();
  const [formState, setFormState] = useState({ username: "", password: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = formState;
    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false, // Prevent automatic redirection
      });

      if (result?.error) {
        toast(result.error, { type: "error" }); // Show error toast
      } else if (result?.ok) {
        toast("Successfully signed in!", { type: "success" }); // Show success toast
        router.replace("/"); // Redirect
      }
    } catch (err: any) {
      toast(err.message, { type: "error" }); // Show error toast
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col w-72 min-h-72 bg-white rounded items-center justify-evenly p-4">
        <h1 className="text-blue-600">Sign in!</h1>
        <form
          onSubmit={handleSubmit}
          className="font-medium text-black  flex flex-col gap-2 my-4 mx-2 w-[90%]"
        >
          <label htmlFor="username" className=" ">
            Username:
          </label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full block border rounded-md p-2"
            value={formState.username}
            onChange={handleChange}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full block border rounded-md p-2"
            value={formState.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="text-black border-2 rounded self-center px-3 py-1 mx-auto mt-4"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

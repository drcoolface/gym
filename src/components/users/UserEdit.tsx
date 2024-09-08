"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { handleEdit } from "@/app/users/action";
import { users } from "@prisma/client";

interface UserEditProps {
  user: users;
  userId: string;
}

const UserEdit: React.FC<UserEditProps> = ({ user, userId }) => {
  const router = useRouter();
  const [formState, setFormState] = useState({
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    phone_number: user.phone_number || "",
  });

  const handleClose = () => {
    router.back();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await handleEdit(Number(userId), formState);
      setTimeout(() => {
        router.refresh(); // Refresh the page after saving
      }, 1000);
      router.back(); // Navigate back after saving
    } catch (error) {
      console.error("Failed to edit user", error);
    }
  };

  return (
    <div className="space-y-4 text-black">
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="first_name"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formState.first_name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="last_name"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formState.last_name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="phone_number"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            value={formState.phone_number}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-colors duration-300"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserEdit;

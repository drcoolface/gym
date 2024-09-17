"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { handleEdit } from "@/app/users/action";
import { users } from "@prisma/client";
import { handleDelete } from "@/app/users/action";
import { toast } from "react-toastify";

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
      toast.success("User updated successfully");

      setTimeout(() => {
        router.back();
        router.refresh();
      }, 300);
    } catch (error: any) {
      router.back(); // Navigate back after saving
      console.error("Failed to edit user", error);
      toast.error("Failed to edit user", error);
    }
  };

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const confirmDelete = async () => {
    try {
      await handleDelete(Number(userId));
      toast.success("User deleted successfully");

      setTimeout(() => {
        router.back();
        router.refresh();
      }, 300);
    } catch (error: any) {
      router.back(); // Navigate back after saving
      toast.error("Failed to delete user", error);
    } finally {
      closeDialog();
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
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-md"
        onClick={() => userId && openDialog()}
      >
        Delete
      </button>
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete this user?</p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors duration-300"
                onClick={closeDialog}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserEdit;

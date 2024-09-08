"use server";
import { UserService } from "@/services/UserService";
import { users } from "@prisma/client";

export const handleEdit = async (
  userId: number,
  updatedData: Partial<users>
) => {
  try {
    await UserService.editUserById(Number(userId), updatedData);
  } catch (error: any) {
    throw new Error(`Failed to save plan: ${error.message}`);
  }
};
export const handleCreate = async (newData: any) => {
  try {
    await UserService.createUser(newData);
  } catch (error: any) {
    throw new Error(`Failed to create plan: ${error.message}`);
  }
};

export const handleDelete = async (userId: number) => {
  try {
    await UserService.deleteUserById(userId);
    console.log("Plan deleted successfully");
  } catch (error: any) {
    throw new Error(`Failed to delete plan: ${error.message}`);
  }
};

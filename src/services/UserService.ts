import { saltAndHashPassword } from "@/lib/utils";
import { UserRepository } from "@/repositories/UserRepository";
import { Prisma, users } from "@prisma/client";

export class UserService {
  static async getUsers(
    page: number,
    pageSize: number,
    sortBy: string,
    sortOrder: string,
    filter: string
  ): Promise<{ users: Partial<users>[]; totalUsers: number }> {
    const repository = new UserRepository();
    try {
      const { users, totalUsers } = await repository.getUsers(
        page,
        pageSize,
        sortBy,
        sortOrder,
        filter
      );

      return { users, totalUsers };
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Failed to fetch users");
    }
  }

  static async getUserById(id: number): Promise<users | null> {
    const repository = new UserRepository();
    try {
      const data = await repository.getUserById(id);
      return data;
    } catch (error: any) {
      throw new Error("Error fetching user by ID:", error);
    }
  }

  static async editUserById(id: number, data: Prisma.usersUpdateInput) {
    const repository = new UserRepository();
    try {
      const user = await repository.editUserById(id, data);
      return user;
    } catch (error: any) {
      throw new Error("Error editing user:", error);
    }
  }

  static async createUser(data: any) {
    const repository = new UserRepository();
    try {
      const password = data.password;
      const hashedPassword = await saltAndHashPassword(password);
      const newData = { ...data, password: hashedPassword };

      const newUser = await repository.createUser(newData);
      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  }

  static async deleteUserById(id: number) {
    const repository = new UserRepository();

    if (!id) {
      throw new Error("User ID is required");
    }
    try {
      await repository.deleteUserById(id);
      console.log("User deleted successfully", id);
    } catch (error) {
      console.error("Error deleting user by ID:", error);
      throw new Error("Failed to delete user");
    }
  }
}

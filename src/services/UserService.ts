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
      const newPlan = await repository.createUser(data);
      return newPlan;
    } catch (error) {
      console.error("Error creating plan:", error);
      throw new Error("Failed to create plan");
    }
  }

  static async deleteUserById(id: number) {
    const repository = new UserRepository();

    if (!id) {
      throw new Error("Plan ID is required");
    }
    try {
      await repository.deleteUserById(id);
      console.log("Plan deleted successfully", id);
    } catch (error) {
      console.error("Error deleting plan by ID:", error);
      throw new Error("Failed to delete plan");
    }
  }
}

import { Prisma, subscriptions, users } from "@prisma/client";
import { db } from "@/lib/db"; // Adjust the import based on your folder structure

export class UserRepository {
  async getUsers(
    page: number = 1,
    pageSize: number = 10,
    sortBy: string = "u_id",
    sortOrder: string = "asc",
    filter: string = ""
  ): Promise<{
    users: (Partial<users> & { subscriptions: Partial<subscriptions>[] })[];
    totalUsers: number;
  }> {
    const pageNumber = page || 1;
    const limit = pageSize || 10;
    const skip = (pageNumber - 1) * limit;

    const where: Prisma.usersWhereInput = filter
      ? {
          OR: [
            {
              user_name: {
                contains: filter,
                mode: Prisma.QueryMode.insensitive,
              },
            },

            {
              first_name: {
                contains: filter,
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              last_name: {
                contains: filter,
                mode: Prisma.QueryMode.insensitive,
              },
            },
          ],
        }
      : {};

    const users: (Partial<users> & {
      subscriptions: Partial<subscriptions>[];
    })[] = await db.users.findMany({
      where,
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip,
      take: limit,
      select: {
        first_name: true,
        last_name: true,
        user_name: true,
        role: true,
        u_id: true,
        subscriptions: {
          select: {
            p_id: true,
            validity_days: true,
            membership_plans: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    const totalUsers = await db.users.count({ where });

    return { users, totalUsers };
  }

  async getUserById(id: number): Promise<users | null> {
    const user = await db.users.findUnique({
      where: {
        u_id: id,
      },
    });
    return user;
  }

  async editUserById(
    id: number,
    data: Prisma.usersUpdateInput
  ): Promise<users | null> {
    const user = db.users.update({
      where: {
        u_id: id,
      },
      data,
    });
    return user;
  }

  async createUser(data: Prisma.usersCreateInput) {
    const user = db.users.create({
      data,
    });
    return user;
  }

  async deleteUserById(id: number) {
    await db.users.delete({
      where: {
        u_id: id,
      },
    });
  }
}

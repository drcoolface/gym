import { Prisma } from "@prisma/client";
import { db } from "@/lib/db"; // Adjust the import based on your folder structure
import { MembershipPlans } from "@/types/db_types";

export class UserRepository {
  async getPlans(
    page: number = 1,
    pageSize: number = 10,
    sortBy: string = "p_id",
    sortOrder: string = "asc",
    filter: string = ""
  ): Promise<{ plans: MembershipPlans[]; totalPlans: number }> {
    const pageNumber = page || 1;
    const limit = pageSize || 10;
    const skip = (pageNumber - 1) * limit;

    const where: Prisma.membership_plansWhereInput = filter
      ? {
          OR: [
            {
              name: {
                contains: filter,
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              description: {
                contains: filter,
                mode: Prisma.QueryMode.insensitive,
              },
            },
          ],
        }
      : {};

    const plans = await db.membership_plans.findMany({
      where,
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip,
      take: limit,
    });

    const totalPlans = await db.membership_plans.count({ where });

    return { plans, totalPlans };
  }

  async getPlanById(id: number): Promise<MembershipPlans | null> {
    const plan = db.membership_plans.findUnique({
      where: {
        p_id: id,
      },
    });
    return plan;
  }

  async editPlanById(
    id: number,
    data: Prisma.membership_plansUpdateInput
  ): Promise<MembershipPlans | null> {
    const plan = db.membership_plans.update({
      where: {
        p_id: id,
      },
      data,
    });
    return plan;
  }

  async createPlan(data: Prisma.membership_plansCreateInput) {
    const plan = db.membership_plans.create({
      data,
    });
    return plan;
  }

  async deletePlanById(id: number) {
    await db.membership_plans.delete({
      where: {
        p_id: id,
      },
    });
  }
}

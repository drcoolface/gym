import { PlansRepository } from "@/repositories/PlanRepository";
import { MembershipPlans } from "@/types/db_types";
import { Decimal } from "@prisma/client/runtime/library";

export class PlansService {
  private static convertDecimalToNumber(plans: any[]) {
    return plans.map((plan) => ({
      ...plan,
      rate: plan.rate instanceof Decimal ? Number(plan.rate) : plan.rate,
    }));
  }
  static async getPlans(
    page: number,
    pageSize: number,
    sortBy: string,
    sortOrder: string,
    filter: string
  ) {
    const repository = new PlansRepository();
    try {
      const data = repository.getPlans(
        page,
        pageSize,
        sortBy,
        sortOrder,
        filter
      );
      const convertedPlans = this.convertDecimalToNumber((await data).plans);

      return {
        plans: convertedPlans,
        totalPlans: (await data).totalPlans,
      };
    } catch (error) {
      console.error("Error fetching plans:", error);
      throw new Error("Failed to fetch plans");
    }
  }

  static async getPlanById(id: number): Promise<MembershipPlans | null> {
    const repository = new PlansRepository();
    try {
      const data = await repository.getPlanById(id);
      return data;
    } catch (error) {
      console.error("Error fetching plan by ID:", error);
      throw new Error("Failed to fetch plan");
    }
  }

  static async editPlanById(id: number, data: any) {
    const repository = new PlansRepository();
    try {
      const updatedPlan = await repository.editPlanById(id, data);
      return updatedPlan;
    } catch (error) {
      console.error("Error editing plan by ID:", error);
      throw new Error("Failed to edit plan");
    }
  }

  static async createPlan(data: any) {
    const repository = new PlansRepository();
    try {
      const newPlan = await repository.createPlan(data);
      return newPlan;
    } catch (error) {
      console.error("Error creating plan:", error);
      throw new Error("Failed to create plan");
    }
  }

  static async deletePlanById(id: number) {
    const repository = new PlansRepository();

    if (!id) {
      throw new Error("Plan ID is required");
    }
    try {
      await repository.deletePlanById(id);
      console.log("Plan deleted successfully", id);
    } catch (error) {
      console.error("Error deleting plan by ID:", error);
      throw new Error("Failed to delete plan");
    }
  }
}

"use server";
import { PlansService } from "@/services/PlanService";
import { MembershipPlans } from "@/types/db_types";

export const handleEdit = async (
  planId: number,
  updatedData: Partial<MembershipPlans>
) => {
  try {
    await PlansService.editPlanById(Number(planId), updatedData);
  } catch (error: any) {
    throw new Error(`Failed to save plan: ${error.message}`);
  }
};
export const handleCreate = async (newData: any) => {
  try {
    await PlansService.createPlan(newData);
  } catch (error: any) {
    throw new Error(`Failed to create plan: ${error.message}`);
  }
};

export const handleDelete = async (planId: number) => {
  try {
    await PlansService.deletePlanById(planId);
    console.log("Plan deleted successfully");
  } catch (error: any) {
    throw new Error(`Failed to delete plan: ${error.message}`);
  }
};

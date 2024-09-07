import React from "react";
import { PlansService } from "@/services/PlanService";
import { MembershipPlans } from "@/types/db_types";
import Modal from "@/components/ui/modal";
import PlanEdit from "@/components/plans/planEdit";

export default async function PlanEditModal({
  params: { planId },
}: {
  params: { planId: string };
}) {
  const plan: MembershipPlans | null = (await PlansService.getPlanById(
    Number(planId)
  )) as unknown as MembershipPlans | null;

  if (!plan) {
    return <div>Plan not found</div>;
  }

  return (
    <Modal open={true}>
      <PlanEdit plan={plan} planId={planId} />
    </Modal>
  );
}

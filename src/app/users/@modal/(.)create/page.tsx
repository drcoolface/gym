import Modal from "@/components/ui/modal";
import PlanCreate from "@/components/plans/PlanCreate";

export default async function PlanCreateModal() {
  return (
    <Modal open={true}>
      <PlanCreate />
    </Modal>
  );
}

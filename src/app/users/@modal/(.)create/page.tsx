import Modal from "@/components/ui/modal";

import UserCreate from "@/components/users/UserCreate";

export default async function UserCreateModal() {
  return (
    <Modal open={true}>
      <UserCreate />
    </Modal>
  );
}

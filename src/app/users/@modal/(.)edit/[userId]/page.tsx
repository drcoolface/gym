import React from "react";

import Modal from "@/components/ui/modal";

import { UserService } from "@/services/UserService";
import { users } from "@prisma/client";
import UserEdit from "@/components/users/UserEdit";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export default async function UserEditModal({
  params: { userId },
}: {
  params: { userId: string };
}) {
  const user: users | null = (await UserService.getUserById(
    Number(userId)
  )) as unknown as users | null;

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <Modal open={true}>
      <UserEdit user={user} userId={userId} />
    </Modal>
  );
}

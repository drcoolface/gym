import Modal from "@/components/ui/modal";

import UserCreate from "@/components/users/UserCreate";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

import { NextRequest } from "next/server";

export default async function UserCreateModal() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <Modal open={true}>You must be logged in to create a user.</Modal>;
  }

  if (session && session.user.role !== "ADMIN") {
    return <Modal open={true}>You must be admin to create a user.</Modal>;
  }

  {
    session && session.user.role === "ADMIN";
    return (
      <Modal open={true}>
        <UserCreate />
      </Modal>
    );
  }
}

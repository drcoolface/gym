import React, { Suspense } from "react";
import Filters from "@/components/users/filters";
import Pagination from "@/components/ui/pagination";
import { ToastContainer } from "react-toastify";
import Title from "@/components/ui/title";
import UserList from "@/components/users/UserList";
import { UserService } from "@/services/UserService";

interface PageProps {
  searchParams: {
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: string;
    filter?: string;
  };
  modal: React.ReactNode;
}

const Page = async ({ searchParams }: PageProps) => {
  const page = parseInt(String(searchParams.page || "1"), 10);
  const pageSize = parseInt(String(searchParams.pageSize || "10"), 10);
  const sortBy = searchParams.sortBy || "u_id";
  const sortOrder = searchParams.sortOrder || "asc";
  const filter = searchParams.filter || "";

  const { users, totalUsers } = await UserService.getUsers(
    page,
    pageSize,
    sortBy,
    sortOrder,
    filter
  );

  return (
    <div className="w-full min-h-screen  p-4">
      <Title />
      <Filters />
      <Suspense fallback={<div>LOADING</div>}>
        <UserList users={users} totalUsers={totalUsers} />
      </Suspense>
      <Pagination total={totalUsers} />
      <ToastContainer />
    </div>
  );
};

export default Page;

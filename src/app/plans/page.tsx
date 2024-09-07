import React, { Suspense } from "react";
import Filters from "@/components/ui/filters";
import { PlansService } from "@/services/PlanService";
import PlanList from "@/components/plans/planList";
import Pagination from "@/components/ui/pagination";
import { ToastContainer } from "react-toastify";
import Title from "@/components/ui/title";

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
  const sortBy = searchParams.sortBy || "p_id";
  const sortOrder = searchParams.sortOrder || "asc";
  const filter = searchParams.filter || "";

  const { plans, totalPlans } = await PlansService.getPlans(
    page,
    pageSize,
    sortBy,
    sortOrder,
    filter
  );

  return (
    <div className="w-full h-screen  relative p-4">
      <Title />
      <Filters />
      <Suspense fallback={<div>LOADING</div>}>
        <PlanList plans={plans} totalPlans={totalPlans} />
      </Suspense>
      <Pagination total={totalPlans} />
    </div>
  );
};

export default Page;

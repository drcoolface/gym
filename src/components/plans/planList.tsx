"use client";
import React, { useState } from "react";
import { MembershipPlans } from "@/types/db_types";
import Link from "next/link";
import { handleDelete } from "@/app/plans/action";
import { useRouter } from "next/navigation";

interface PlanListProps {
  plans: MembershipPlans[];
  totalPlans: number;
}

const PlanList: React.FC<PlanListProps> = ({ plans, totalPlans }) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [planToDelete, setPlanToDelete] = useState<number | null>(null);

  const openDialog = (id: number) => {
    setPlanToDelete(id);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setPlanToDelete(null);
  };

  const confirmDelete = async () => {
    if (planToDelete !== null) {
      try {
        await handleDelete(planToDelete);
        setTimeout(() => {
          router.refresh(); // Refresh the page after deleting
        }, 100);
      } catch (error) {
        console.error("Failed to delete plan", error);
      } finally {
        closeDialog();
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 text-red-400">
      <div className="text-white text-center py-4">
        Total records: {totalPlans ? totalPlans : "none"}
      </div>
      <ul className="space-y-4">
        {plans.map((plan) => (
          <li
            key={plan.p_id}
            className="p-4 border border-gray-200 rounded-md shadow-sm"
          >
            <div className="flex justify-between p-4 items-center">
              <div className="flex justify-between gap-8">
                <div>
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <p className="text-blue-600 font-bold">
                    Rs. {Number(plan.rate.toString()).toFixed()}
                  </p>
                </div>
                <p className="text-gray-400 text-pretty">{plan.description}</p>
              </div>

              <div className="flex flex-col gap-2 text-center">
                <Link
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  href={`plans/edit/${plan.p_id}`}
                >
                  Edit
                </Link>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                  onClick={() => openDialog(plan.p_id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Confirmation Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete this plan?</p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors duration-300"
                onClick={closeDialog}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanList;

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { handleEdit } from "@/app/plans/action";
import { MembershipPlans } from "@/types/db_types";

interface PlanEditProps {
  plan: MembershipPlans;
  planId: string;
}

const PlanEdit: React.FC<PlanEditProps> = ({ plan, planId }) => {
  const router = useRouter();
  const [description, setDescription] = useState(plan.description || "");
  const [rate, setRate] = useState(Number(plan.rate.toString()) || 0);

  const handleClose = () => {
    router.back();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedData = {
      description,
      rate: Number(rate),
    };

    try {
      await handleEdit(Number(planId), updatedData);
      setTimeout(() => {
        router.refresh(); // Refresh the page after saving
      }, 1000);
      router.back(); // Navigate back after saving
    } catch (error) {
      console.error("Failed to edit plan", error);
    }
  };

  return (
    <div className="space-y-4 text-black">
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            disabled
            defaultValue={plan.name}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="rate"
            className="block text-sm font-medium text-gray-700"
          >
            Rate
          </label>
          <input
            type="number"
            id="rate"
            name="rate"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-colors duration-300"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlanEdit;

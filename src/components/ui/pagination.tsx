"use client";
import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { debounce } from "lodash";

const Pagination = ({ total }: { total: number }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Default values
  const defaultPage = 1;
  const defaultPageSize = 10;

  // State management for filter, sort, and pagination
  const [page, setPage] = useState<number>(
    parseInt(searchParams.get("page") || defaultPage.toString(), 10)
  );
  const [pageSize, setPageSize] = useState<number>(
    parseInt(searchParams.get("pageSize") || defaultPageSize.toString(), 10)
  );

  const totalPages = Math.ceil(total / pageSize);

  // Update URL parameters based on state
  const updateUrlParams = useCallback(
    debounce(() => {
      const params = new URLSearchParams();

      if (page !== defaultPage) params.set("page", page.toString());
      if (pageSize !== defaultPageSize)
        params.set("pageSize", pageSize.toString());

      router.replace(`${pathname}?${params.toString()}`);
    }, 300), // Adjust delay as needed
    [page, pageSize, pathname, router]
  );

  useEffect(() => {
    updateUrlParams(); // Trigger URL update when parameters change
  }, [page, pageSize, updateUrlParams]);

  return (
    <div className="max-w-3xl mx-auto p-4 text-red-400">
      <div className="mb-4 flex justify-between items-center space-x-4 ">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page <= 1}
          className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-blue-300"
        >
          Previous
        </button>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page >= totalPages}
          className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-blue-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;

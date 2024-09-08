"use client";
import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { debounce } from "lodash";

const Filters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter(Boolean);
  const resource = pathSegments[pathSegments.length - 1] || "";

  const defaultSortBy = resource[0].toLowerCase() + "_id";
  const defaultSortOrder = "asc";
  const defaultFilter = "";

  const [sortBy, setSortBy] = useState<string>(
    searchParams.get("sortBy") || defaultSortBy
  );
  const [sortOrder, setSortOrder] = useState<string>(
    searchParams.get("sortOrder") || defaultSortOrder
  );
  const [filter, setFilter] = useState<string>(
    searchParams.get("filter") || defaultFilter
  );

  // Update URL parameters based on state
  const updateUrlParams = useCallback(
    debounce(() => {
      const params = new URLSearchParams();

      if (sortBy !== defaultSortBy) params.set("sortBy", sortBy);
      if (sortOrder !== defaultSortOrder) params.set("sortOrder", sortOrder);
      if (filter !== defaultFilter) params.set("filter", filter);

      router.replace(`${pathname}?${params.toString()}`);
    }, 300), // Adjust delay as needed
    [sortBy, sortOrder, filter, pathname, router]
  );

  useEffect(() => {
    updateUrlParams(); // Trigger URL update when parameters change
  }, [sortBy, sortOrder, filter, updateUrlParams]);

  return (
    <div className="max-w-3xl mx-auto p-4 text-red-400">
      <div className="mb-4 flex justify-between items-center space-x-4 flex-wrap">
        <input
          type="text"
          placeholder="Search by first_name or user_name."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 flex-1"
        />

        <select
          onChange={(e) => setSortBy(e.target.value)}
          value={sortBy}
          className="border border-gray-300 rounded-md px-3 py-2"
        >
          <option value="u_id">ID</option>
          <option value="user_name">User name</option>
        </select>

        <select
          onChange={(e) => setSortOrder(e.target.value)}
          value={sortOrder}
          className="border border-gray-300 rounded-md px-3 py-2"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <button
          className="py-2 px-3 bg-green-400 text-white rounded-md"
          onClick={() => router.push(`/${resource}/create`)}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default Filters;

"use client";
import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { debounce } from "lodash";
import { useSession } from "next-auth/react";

const Filters = () => {
  const session = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter(Boolean);
  const resource = pathSegments[pathSegments.length - 1] || "";

  const defaultSortBy = resource[0].toLowerCase() + "_id";
  const defaultSortOrder = "asc";
  const defaultFilter = "";

  const isAdmin =
    session &&
    session.status === "authenticated" &&
    session.data.user.role === "ADMIN";

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
      <div className="mb-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
        <input
          type="text"
          placeholder="Search by first_name or user_name."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full md:flex-1"
        />

        <select
          onChange={(e) => setSortBy(e.target.value)}
          value={sortBy}
          className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-auto"
        >
          <option value="u_id">ID</option>
          <option value="user_name">User name</option>
        </select>

        <select
          onChange={(e) => setSortOrder(e.target.value)}
          value={sortOrder}
          className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-auto"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        {isAdmin && (
          <button
            className="py-2 px-3 bg-green-400 text-white rounded-md w-full md:w-auto"
            onClick={() => router.push(`/${resource}/create`)}
          >
            Create
          </button>
        )}
      </div>
    </div>
  );
};

export default Filters;

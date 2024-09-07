"use client";
import React from "react";
import { capitalize } from "lodash";
import { usePathname } from "next/navigation";

export const urlgetter = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((segment) => segment); // Filter out empty segments
  return segments.map(capitalize).join(" / ");
};

const Title = () => {
  const title = urlgetter();

  return (
    <h2 className="text-xl md:text-2xl font-bold text-indigo-100 text-center">
      {title}
    </h2>
  );
};

export default Title;

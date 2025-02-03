"use client";

import { usePathname } from "next/navigation";

const useProductId = () => {
  const pathname = usePathname();
  return pathname.split("/").pop();
};

export default useProductId;

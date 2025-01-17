import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Combines Tailwind CSS classes conditionally and handles conflicts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

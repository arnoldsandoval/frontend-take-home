import { Role, User } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getRoleById(roleId: string, roles: Role[]) {
  return roles.find((role) => role.id === roleId)?.name;
}

export function formatFullName(user: User) {
  return [user.first, user.last].join(" ");
}

export function formatInitials(user: User) {
  return [user.first[0], user.last[0]].join("").toUpperCase();
}

import { getRoles, getRolesUrl } from "@/services/roles";
import { Role } from "@/types";
import useSWR from "swr";

export function useRoles(search?: string) {
  const url = getRolesUrl(search);

  return useSWR<Role[]>(url, () => getRoles(search), {
    keepPreviousData: true,
  });
}

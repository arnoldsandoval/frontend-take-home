import { getApiUrl } from "./api";
import { Role } from "@/types";

export const getRolesUrl = (search?: string) => getApiUrl("/roles", search);

export const getRoles = async (search?: string): Promise<Role[]> => {
  const response = await fetch(getRolesUrl(search));

  if (!response.ok) {
    throw new Error("Failed to fetch roles");
  }

  const data = await response.json();
  return data.data;
};

export const deleteRole = async (roleId: string) => {
  const response = await fetch(getApiUrl(`/roles/${roleId}`), {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete role");
  }

  return response;
};

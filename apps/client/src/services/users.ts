import { getApiUrl } from "./api";
import { User } from "@/types";

export const getUsersUrl = (search?: string) => getApiUrl("/users", search);

export const getUsers = async (search?: string): Promise<User[]> => {
  const response = await fetch(getUsersUrl(search));

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const data = await response.json();
  return data.data;
};

export const deleteUser = async (userId: string) => {
  const response = await fetch(getApiUrl(`/users/${userId}`), {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete user");
  }

  return response;
};

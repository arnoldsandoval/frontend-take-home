import { getUsers, getUsersUrl } from "@/services/users";
import { User } from "@/types";
import useSWR from "swr";

export function useUsers(search?: string) {
  const url = getUsersUrl(search);

  return useSWR<User[]>(url, () => getUsers(search), {
    keepPreviousData: true,
  });
}

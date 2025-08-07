"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRoles } from "@/hooks/use-roles";
import { useUsers } from "@/hooks/use-users";
import {
  formatDate,
  formatFullName,
  formatInitials,
  getRoleById,
} from "@/lib/utils";
import { User } from "@/types";
import { MoreHorizontal, Plus } from "lucide-react";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DialogDeleteUser } from "./dialog-delete-user";
import { TableActions } from "./table-actions";
import { TableLoader } from "./table-loader";

export const TableUser = () => {
  const [search] = useQueryState("search");
  const {
    data: users,
    isLoading: isLoadingUsers,
    error: usersError,
  } = useUsers(search || undefined);
  const {
    data: roles,
    isLoading: isLoadingRoles,
    error: rolesError,
  } = useRoles();
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isLoading = isLoadingUsers || isLoadingRoles;

  if (usersError) throw usersError;
  if (rolesError) throw rolesError;

  return (
    <>
      <TableActions
        filterPlaceholder="Search users&hellip;"
        end={
          <Button>
            <Plus />
            Add user
          </Button>
        }
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead>
              <span className="sr-only">User modification options</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableLoader rowsOnly />
          ) : !users || users.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-8 text-muted-foreground"
              >
                {search ? `No users found for "${search}"` : "No users found"}
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <span className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={user.photo} />
                      <AvatarFallback>{formatInitials(user)}</AvatarFallback>
                    </Avatar>
                    {formatFullName(user)}
                  </span>
                </TableCell>
                <TableCell>{getRoleById(user.roleId, roles || [])}</TableCell>
                <TableCell>{formatDate(user.createdAt)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-6">
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          window.alert("not implemented");
                        }}
                      >
                        Edit user
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setUserToDelete(user);
                          setIsDialogOpen(true);
                        }}
                      >
                        Delete user
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <DialogDeleteUser
        user={
          userToDelete ||
          ({
            id: "",
            first: "",
            last: "",
            roleId: "",
            photo: "",
          } as User)
        }
        open={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          // Delay clearing state to let dialog close animation finish
          setTimeout(() => setUserToDelete(null), 200);
        }}
      />
    </>
  );
};

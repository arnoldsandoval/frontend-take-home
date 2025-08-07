"use client";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRoles } from "@/hooks/use-roles";
import { Role } from "@/types";
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
import { DialogDeleteRole } from "./dialog-delete-role";
import { TableActions } from "./table-actions";
import { TableLoader } from "./table-loader";

export const TableRoles = () => {
  const [search] = useQueryState("search");
  const {
    data: roles,
    isLoading: isLoadingRoles,
    error: rolesError,
  } = useRoles(search || undefined);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isLoading = isLoadingRoles;

  if (rolesError) throw rolesError;

  return (
    <>
      <TableActions
        filterPlaceholder="Search roles&hellip;"
        end={
          <Button
            onClick={() => {
              window.alert("not implemented");
            }}
          >
            <Plus />
            Add role
          </Button>
        }
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Role</TableHead>

            <TableHead>Description</TableHead>
            <TableHead>
              <span className="sr-only">User modification options</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableLoader columns={3} rowsOnly withAvatar={false} />
          ) : !roles || roles.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-center py-8 text-muted-foreground"
              >
                {search ? `No roles found for "${search}"` : "No roles found"}
              </TableCell>
            </TableRow>
          ) : (
            roles.map((role: Role) => (
              <TableRow key={role.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {role.name}
                    {role.isDefault && (
                      <Badge variant="secondary">Default</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="max-w-0 w-full">
                  <span className="truncate block">{role.description}</span>
                </TableCell>
                <TableCell className="flex justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-6">
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => {
                          window.alert("not implemented");
                        }}
                      >
                        Edit role
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setRoleToDelete(role);
                          setIsDialogOpen(true);
                        }}
                      >
                        Delete role
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <DialogDeleteRole
        role={roleToDelete || ({} as Role)}
        open={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          // Delay clearing state to let dialog close animation finish
          setTimeout(() => setRoleToDelete(null), 200);
        }}
      />
    </>
  );
};

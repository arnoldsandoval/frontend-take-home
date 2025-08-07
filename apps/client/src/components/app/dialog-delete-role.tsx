import { deleteRole, getRoles, getRolesUrl } from "@/services/roles";
import { Role } from "@/types";
import { useQueryState } from "nuqs";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface DialogDeleteRoleProps {
  role: Role;
  open: boolean;
  onClose: () => void;
}

export const DialogDeleteRole = ({
  role,
  open,
  onClose,
}: DialogDeleteRoleProps) => {
  const { mutate } = useSWRConfig();
  const [search] = useQueryState("search");

  const handleDelete = async () => {
    onClose();
    const toastId = toast.loading(`Deleting ${role.name}...`);

    const url = getRolesUrl(search || undefined);

    try {
      await mutate(
        url,
        async () => {
          await deleteRole(role.id);
          return getRoles(search || undefined);
        },
        {
          rollbackOnError: true,
          revalidate: false,
        }
      );

      toast.success(`${role.name} deleted`, { id: toastId });
    } catch (error) {
      toast.error("Failed to delete role. Please try again.", { id: toastId });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete role</DialogTitle>
          <DialogDescription>
            Are you sure? The role{" "}
            <strong className="font-medium">{role.name}</strong> will be
            permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" variant="destructive" onClick={handleDelete}>
            Delete role
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

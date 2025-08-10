import { formatFullName } from "@/lib/utils";
import { deleteUser, getUsers, getUsersUrl } from "@/services/users";
import { User } from "@/types";
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

interface DialogDeleteUserProps {
  user: User;
  open: boolean;
  onClose: () => void;
}

export const DialogDeleteUser = ({
  user,
  open,
  onClose,
}: DialogDeleteUserProps) => {
  const { mutate } = useSWRConfig();
  const [search] = useQueryState("search");

  const handleDelete = async () => {
    onClose();
    const toastId = toast.loading(`Deleting ${formatFullName(user)}...`);

    const url = getUsersUrl(search || undefined);

    try {
      await mutate(
        url,
        async () => {
          await deleteUser(user.id);
          return getUsers(search || undefined);
        },
        {
          rollbackOnError: true,
          revalidate: false,
        }
      );

      toast.success(`${formatFullName(user)} deleted`, { id: toastId });
    } catch (error) {
      toast.error("Failed to delete user. Please try again.", { id: toastId });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete user</DialogTitle>
          <DialogDescription>
            Are you sure? The user{" "}
            <strong className="font-semibold">{formatFullName(user)}</strong>{" "}
            will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" variant="destructive" onClick={handleDelete}>
            Delete user
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

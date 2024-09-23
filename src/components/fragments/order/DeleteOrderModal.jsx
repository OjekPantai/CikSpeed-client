/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const DeleteOrderModal = ({ open, onClose, onConfirm, order }) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent className="max-w-[425px] md:max-w-xl rounded-lg grid gap-6">
      <DialogHeader className="grid gap-4">
        <DialogTitle>Delete Order</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete {order?.name} from the order list?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <div className="grid grid-cols-2 md:grid gap-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default DeleteOrderModal;

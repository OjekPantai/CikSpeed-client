/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { priceFormat } from "@/lib/utils";

const OrderDetailModal = ({ open, onClose, order }) => {
  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Order Details
          </DialogTitle>
          <DialogDescription>Details for order #{order.id}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {[
            { label: "Name", value: order.name },
            { label: "Motorcycle Type", value: order.motorcycleType },
            { label: "Phone", value: order.phone },
            { label: "Complaint", value: order.complaintMessage },
            { label: "Address", value: order.address },
            {
              label: "Total Price",
              value: priceFormat(
                order.services.reduce((acc, service) => acc + service.price, 0)
              ),
            },
            { label: "Status", value: order.status },
          ].map(({ label, value }, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="font-medium text-muted-foreground">{label}</span>
              <span className="font-medium capitalize">{value}</span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailModal;

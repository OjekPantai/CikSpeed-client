import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye, MoreHorizontal, PlusCircle, Trash } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteOrderModal from "@/components/fragments/order/DeleteOrderModal";
import AddOrderModal from "@/components/fragments/order/AddOrderModal";
import customApi from "@/api/customApi";
import { toast } from "sonner";
import OrderDetailModal from "@/components/fragments/order/DetailOrderModal";
import { priceFormat, truncateMessage } from "@/lib/utils";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  // Modals
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const navigate = useNavigate();
  const getOrders = async () => {
    try {
      const { data } = await customApi.get(`/orders`);
      setOrders(data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleDeleteClick = (order) => {
    setSelectedOrder(order);
    setDeleteModalOpen(true);
  };

  const handleDetailClick = (order) => {
    setSelectedOrder(order);
    setDetailModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await customApi.delete(`/orders/${selectedOrder.id}`);
      await getOrders();
      setDeleteModalOpen(false);
      toast.success("Order deleted successfully");
    } catch (error) {
      toast.error(`Error deleting order: ${error.message}`);
    }
  };

  const handleAddOrder = async (newOrder) => {
    try {
      await customApi.post("/orders", newOrder);
      await getOrders();
      setAddModalOpen(false);
      navigate("/orders");
      toast.success("Order added successfully");
    } catch (error) {
      toast.error(`Error adding order: ${error.message}`);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await customApi.put(`/orders/${orderId}`, { status: newStatus });
      await getOrders();
      toast.success("Order status updated successfully");
    } catch (error) {
      toast.error(`Error updating order status: ${error.message}`);
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <section>
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Orders</h1>
        </div>
      </section>
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between">
              <div>Orders</div>
              <div>
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-8 gap-1"
                  onClick={() => setAddModalOpen(true)}
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Order
                  </span>
                </Button>
              </div>
            </CardTitle>
            <CardDescription>
              Manage your orders and view their details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs md:text-base">Name</TableHead>
                  <TableHead className="text-xs md:text-base hidden sm:table-cell">
                    Motorcycle Type
                  </TableHead>
                  <TableHead className="hidden md:text-base sm:table-cell">
                    Phone
                  </TableHead>
                  <TableHead className="hidden md:text-base sm:table-cell">
                    Complaint
                  </TableHead>
                  <TableHead className="hidden md:text-base sm:table-cell">
                    Address
                  </TableHead>
                  <TableHead className="hidden md:text-base sm:table-cell">
                    Total Price
                  </TableHead>
                  <TableHead className="text-xs md:text-base">Status</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow className="text-sm lg:text-base" key={order.id}>
                    <TableCell className="font-semibold capitalize">
                      {truncateMessage(order.name, 3)}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">
                      {truncateMessage(order.motorcycleType, 3)}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {order.phone}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">
                      {truncateMessage(order.complaintMessage, 3)}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">
                      {truncateMessage(order.address, 3)}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell font-regular">
                      {priceFormat(
                        order.services.reduce(
                          (acc, service) => acc + service.price,
                          0
                        )
                      )}
                    </TableCell>
                    <TableCell className="font-semibold">
                      <Select
                        defaultValue={order.status}
                        onValueChange={(value) =>
                          handleStatusChange(order.id, value)
                        }
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="menunggu konfirmasi">
                            Pending
                          </SelectItem>
                          <SelectItem value="dalam antrian">
                            Dalam Antrian
                          </SelectItem>
                          <SelectItem value="sedang dikerjakan">
                            Sedang Dikerjakan
                          </SelectItem>
                          <SelectItem value="selesai">Selesai</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => handleDetailClick(order)}
                            className="text-blue-600 cursor-pointer"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Detail
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteClick(order)}
                            className="text-red-600 cursor-pointer"
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </section>

      <DeleteOrderModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        order={selectedOrder}
      />
      <AddOrderModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddOrder}
      />
      <OrderDetailModal
        open={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        order={selectedOrder}
      />
    </main>
  );
};

export default OrderPage;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, PlusCircle, Trash } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
import EditServiceModal from "@/components/fragments/service/EditServiceModal";
import DeleteServiceModal from "@/components/fragments/service/DeleteServiceModal";
import AddServiceModal from "@/components/fragments/service/AddServiceModal";
import customApi from "@/api/customApi";
import { priceFormat } from "@/lib/utils";
import { toast } from "react-toastify";

const ServicePage = () => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState([]);

  const navigate = useNavigate();
  // const location = useLocation();

  const getServices = async () => {
    try {
      const { data } = await customApi.get("/services");
      setServices(data.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  const handleEditClick = (service) => {
    setSelectedService(service);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (service) => {
    setSelectedService(service);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await customApi.delete(`/services/${selectedService._id}`);
      await getServices();
      setDeleteModalOpen(false);
      toast.warning("Service deleted successfully");
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedService = Object.fromEntries(formData);

    try {
      await customApi.put(`/services/${selectedService._id}`, updatedService);
      await getServices();
      setEditModalOpen(false);
      toast.info("Service updated successfully");
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  const handleAddService = async (newService) => {
    try {
      await customApi.post("/services", newService);
      await getServices();
      setAddModalOpen(false);
      navigate("/services");
      toast.success("Service added successfully");
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <section>
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Services</h1>
        </div>
      </section>
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between">
              <div>Services</div>
              <div>
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-8 gap-1"
                  onClick={() => setAddModalOpen(true)}
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Service
                  </span>
                </Button>
              </div>
            </CardTitle>
            <CardDescription>
              Manage your services and view their sales performance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Deskripsi
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Kategori
                  </TableHead>
                  <TableHead>Estimasi</TableHead>
                  <TableHead>Biaya Servis</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service._id}>
                    <TableCell>{service.name}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {service.description}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell capitalize">
                      {service.category}
                    </TableCell>
                    <TableCell>{service.estimatedTime} Menit</TableCell>
                    <TableCell>{priceFormat(service.price)}</TableCell>
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
                            onClick={() => handleEditClick(service)}
                            className="text-blue-600 cursor-pointer"
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteClick(service)}
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
          <CardFooter>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        </Card>
      </section>
      <EditServiceModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        service={selectedService}
        onSubmit={handleEditSubmit}
      />
      <DeleteServiceModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        service={selectedService}
      />
      <AddServiceModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddService}
      />
    </main>
  );
};

export default ServicePage;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, PlusCircle, Trash } from "lucide-react";
import {
  Pagination,
  PaginationContent,
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
// import { toast } from "react-toastify";
import { toast } from "sonner";

const ServicePage = () => {
  const [services, setServices] = useState([]);

  // Modals
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const navigate = useNavigate();
  const getServices = async (currentPage = 1) => {
    try {
      const { data } = await customApi.get(
        `/services?page=${currentPage}&limit=8`
      );
      setServices(data.data);
      setTotalPage(data.pagination.totalPage);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    getServices(page);
  }, [page]);

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
      await getServices(page); // Refresh services for the current page
      setDeleteModalOpen(false);
      toast.success("Service deleted successfully");
    } catch (error) {
      toast.error(`Error deleting service: ${error.message}`);
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedService = Object.fromEntries(formData);

    try {
      await customApi.put(`/services/${selectedService._id}`, updatedService);
      await getServices(page);
      setEditModalOpen(false);
      toast.success("Service updated successfully");
    } catch (error) {
      toast.error(`Error updating service: ${error.message}`);
    }
  };

  const handleAddService = async (newService) => {
    try {
      await customApi.post("/services", newService);
      await getServices(page);
      setAddModalOpen(false);
      navigate("/services");
      toast.success("Service added successfully");
    } catch (error) {
      toast.error(`Error adding service: ${error.message}`);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
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
                  <TableHead className="text-xs md:text-base">Nama</TableHead>
                  <TableHead className="text-xs md:text-base hidden sm:table-cell">
                    Deskripsi
                  </TableHead>
                  <TableHead className="text-xs md:text-base hidden sm:table-cell">
                    Kategori
                  </TableHead>
                  <TableHead className="text-xs md:text-base">
                    Estimasi
                  </TableHead>
                  <TableHead className="text-xs md:text-base">
                    Biaya Servis
                  </TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow className="text-sm lg:text-base" key={service._id}>
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
            <Pagination className="w-full justify-end">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(page > 1 ? page - 1 : 1)}
                    disabled={page === 1}
                    className={"cursor-pointer"}
                  />
                </PaginationItem>

                {[...Array(totalPage).keys()].map((p) => (
                  <PaginationItem key={p + 1}>
                    <PaginationLink
                      isActive={page === p + 1}
                      onClick={() => handlePageChange(p + 1)}
                      className={"cursor-pointer"}
                    >
                      {p + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      handlePageChange(page < totalPage ? page + 1 : totalPage)
                    }
                    disabled={page === totalPage}
                    className={"cursor-pointer"}
                  />
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

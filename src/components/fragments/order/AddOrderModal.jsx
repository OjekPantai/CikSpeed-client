/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Form } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import customApi from "@/api/customApi";
import { useSelector } from "react-redux";
import {
  calculateTotalEstimatedTime,
  calculateTotalPrice,
  priceFormat,
} from "@/lib/utils";

const AddOrderModal = ({ open, onClose, onSubmit }) => {
  const user = useSelector((state) => state.userState.user?.user);

  const [motorcycleType, setMotorcycleType] = useState("");
  const [phone, setPhone] = useState("");
  const [complaintMessage, setComplaintMessage] = useState("");
  const [address, setAddress] = useState("");
  const [services, setServices] = useState([]);
  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await customApi.get("/services");
        setServicesData(data.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newOrder = Object.fromEntries(formData);
    newOrder.name = user.name;
    newOrder.services = services;
    onSubmit(newOrder);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[480px] md:max-w-xl rounded-lg grid gap-6">
        <DialogHeader>
          <DialogTitle>Add New Order</DialogTitle>
          <DialogDescription>
            Enter the details of the new order
          </DialogDescription>
        </DialogHeader>
        <Form className="grid gap-4" onSubmit={handleSubmit}>
          <div className=" hidden">
            <Label htmlFor="name">Nama</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={user.name}
              disabled
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="motorcycleType">Motorcycle Type</Label>
            <Input
              id="motorcycleType"
              name="motorcycleType"
              type="text"
              value={motorcycleType}
              onChange={(event) => setMotorcycleType(event.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="text"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              type="text"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="complaintMessage">Complaint Message</Label>
            <Textarea
              id="complaintMessage"
              name="complaintMessage"
              type="text"
              value={complaintMessage}
              onChange={(event) => setComplaintMessage(event.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="services">Services</Label>

            {servicesData.map((service) => (
              <div key={service._id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`service-${service._id}`}
                  name="services"
                  value={service._id}
                  checked={services.includes(service._id)}
                  onChange={(event) => {
                    const newServices = [...services];
                    if (event.target.checked) {
                      newServices.push(service._id);
                    } else {
                      newServices.splice(newServices.indexOf(service._id), 1);
                    }
                    setServices(newServices);
                  }}
                />
                <label htmlFor={`service-${service._id}`}>{service.name}</label>
                <span className="text-muted-foreground">
                  {service.estimatedTime} Menit
                </span>
                <span className="text-muted-foreground">
                  Rp {service.price}
                </span>
              </div>
            ))}
          </div>
          <div className="grid mt-4 gap-2">
            <div className="flex justify-between">
              <span>Estimasi Waktu</span>
              <span>
                {calculateTotalEstimatedTime(services, servicesData)} Menit
              </span>
            </div>
            <div className="flex justify-between">
              <span>Total Harga</span>
              <span>
                {priceFormat(calculateTotalPrice(services, servicesData))}
              </span>
            </div>
          </div>

          <DialogFooter>
            <div className="grid grid-cols-2 gap-4">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Add Order</Button>
            </div>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddOrderModal;

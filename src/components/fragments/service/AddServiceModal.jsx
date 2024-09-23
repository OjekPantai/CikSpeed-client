/* eslint-disable react/prop-types */
import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const AddServiceModal = ({ open, onClose, onSubmit }) => {
  const [category, setCategory] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("category", category);
    const newService = Object.fromEntries(formData);
    onSubmit(newService);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[480px] md:max-w-xl rounded-lg grid gap-6">
        <DialogHeader>
          <DialogTitle>Add New Service</DialogTitle>
          <DialogDescription>
            Enter the details of the new service
          </DialogDescription>
        </DialogHeader>
        <Form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="name">Nama Service</Label>
            <Input id="name" name="name" type="text" required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">Kategori</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="servis besar">Servis Besar</SelectItem>
                <SelectItem value="servis ringan">Servis Ringan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="estimatedTime">Estimasi (dalam menit)</Label>
            <Input
              id="estimatedTime"
              name="estimatedTime"
              type="number"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Biaya Servis</Label>
            <Input id="price" name="price" type="number" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              name="description"
              type="text"
              required
            />
          </div>
          <DialogFooter>
            <div className="grid grid-cols-2 gap-4">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Add Service</Button>
            </div>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddServiceModal;

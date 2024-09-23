import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function priceFormat(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export const calculateTotalEstimatedTime = (services, servicesData) => {
  let totalEstimatedTime = 0;
  services.forEach((serviceId) => {
    const service = servicesData.find((service) => service._id === serviceId);
    totalEstimatedTime += service.estimatedTime;
  });
  return totalEstimatedTime;
};

export const calculateTotalPrice = (services, servicesData) => {
  let totalPrice = 0;
  services.forEach((serviceId) => {
    const service = servicesData.find((service) => service._id === serviceId);
    totalPrice += service.price;
  });
  return totalPrice;
};

export const truncateMessage = (message, wordCount) => {
  const words = message.split(" ");
  return words.length > wordCount
    ? words.slice(0, wordCount).join(" ") + "..."
    : message;
};

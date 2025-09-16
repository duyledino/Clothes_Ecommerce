import React from "react";
import { Package } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react";

type user = {
  id: string;
  email: string;
  name: string;
};
type product = {
  title: string;
};
type detailAdmin = {
  size: string;
  count: number;
  product: product;
};

type OrderData = {
  user: user;
  total: number;
  update: Date;
  payment: string;
  status: string;
  detail: detailAdmin[];
};
//
const OrderItem = ({
  user,
  total,
  update,
  payment,
  status,
  detail,
}: OrderData) => {
  const orderStatuses = [
    "Order Placed",
    "Packing",
    "Shipped",
    "Out for delivery",
    "Delivered",
  ];
  console.log(`user, 
  total,
  update,
  payment,
  status,
  detail: `, user,total,update,payment,status,detail);
  return (
    <div className="w-full rounded-md border border-gray-200 bg-white p-4 shadow-sm">
      <div className="grid lg:grid-cols-[0.5fr_3fr_1fr_2fr] sm:grid-cols-[2fr_3fr] grid-cols-1 gap-3 items-center">
        <div className="flex items-start">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100">
            <Package className="h-6 w-6 text-gray-600" />
          </div>
        </div>
        <div>
          <h2 className="md:text-sm text-[12px] font-medium text-gray-700 ">
            <div className="flex flex-col">
              {detail !== undefined
              ? detail
                  .map(
                    (item) =>
                      <p>{item.product.title} x {item.count} {item.size}</p>
                  )
              : `Boy Round Neck Pure Cotton T-shirt x 1 L`}
            </div>
          </h2>
          <p className="md:text-sm text-[12px] text-gray-500">
            {user.email || `Rajvil Choudhary`}
          </p>
          <p className="md:text-sm text-[12px] text-gray-500">
            Agra Gate Road, Ajmer, Rajasthan, India, 305001
          </p>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <div>
            <p className="md:text-sm text-[12px] text-gray-500">
              Items : {detail!==undefined ? detail.reduce((prev, curr) => prev + curr.count, 0):0}
            </p>
            <p className="md:text-sm text-[12px] text-gray-500">Method: COD</p>
            <p className="md:text-sm text-[12px] text-gray-500">
              Payment : {payment}
            </p>
            <p className="md:text-sm text-[12px] text-gray-500">
              Date : {update.toLocaleString().split('T')[0]}
            </p>
          </div>
        </div>
        <div className="flex md:flex-row flex-col md:items-center items-start justify-between gap-4">
          <div className="md:text-sm text-[12px] font-medium text-gray-700">
            {total.toLocaleString()} VND
          </div>
          <div className="">
            <Select defaultValue={status}>
              <SelectTrigger className="md:w-[180px] w-[140px] md:text-sm text-[12px]">
                <SelectValue placeholder="Order Placed" />
              </SelectTrigger>
              <SelectContent>
                {orderStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;

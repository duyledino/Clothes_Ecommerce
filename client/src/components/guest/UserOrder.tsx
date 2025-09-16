import React, { SetStateAction } from "react";
import { Button } from "../ui/button";

interface Detail {
  productId: string;
  count: number;
  subtotal: number;
  size: string;
}

type paymentAndStatus = {
  // orderId
  id: string | undefined;
  //can be an empty string
  payment: string | undefined;
  //can be an empty string
  status: string | undefined;
};

interface UserOrderProps {
  id: string;
  userId: string;
  total: number;
  date: string;
  status: string;
  payment: string;
  address: string;
  details: Detail[];
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  setParam: React.Dispatch<SetStateAction<paymentAndStatus>>;
  handlePay: (orderId: string, total: number) => void;
}

const UserOrder: React.FC<UserOrderProps> = ({
  id,
  userId,
  total,
  date,
  status,
  payment,
  address,
  details,
  setOpen,
  setParam,
  handlePay,
}) => {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="flex justify-between items-center">
        <h1 className="text-gray-700 font-bold text-base">Order ID: {id}</h1>
      </div>
      <p className="text-gray-700 text-base">User ID: {userId}</p>
      <p className="text-gray-700 text-base font-bold">
        Address:{" "}
        {address === "" ? "Please enter address to be delivered" : address}
      </p>
      <p className="text-gray-700 text-base font-bold">Total: {total}</p>
      <p className="text-gray-700 text-base">Date: {date}</p>
      <p className="text-gray-700 text-base font-bold">Status: {status}</p>
      <p className="text-gray-700 text-base font-bold">Payment: {payment}</p>
      <div>
        <p className="text-gray-700 text-base font-bold">Details:</p>
        <ul>
          {details.map((detail, index) => (
            <li key={index} className="text-gray-700 text-base">
              Product ID: {detail.productId}, Count: {detail.count},
              {detail.size} , Subtotal: {detail.subtotal} VND
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-3 flex sm:flex-row flex-col gap-3">
        {status === "Cancel" || payment === "Cancel" ? (
          <Button
            disabled={true}
            variant={"ghost"}
            className="bg-red-300 md:w-fit w-full text-white hover:text-red-600 uppercase font-semibold py-6 px-8 rounded border-2 border-red-600"
          >
            Cancel
          </Button>
        ) : status === "Delivered" || status === "Done" ? (
          ""
        ) : (
          <Button
            onClick={() => {
              setParam({ id, payment, status }), setOpen(true);
            }}
            variant={"ghost"}
            className="bg-red-600 md:w-fit w-full text-white hover:bg-transparent hover:text-red-600 uppercase font-semibold py-6 px-8 rounded border-2 border-red-600 cursor-pointer"
          >
            Cancel
          </Button>
        )}
        {payment === "Done" || payment === "Cancel" || status === "Cancel" ? (
          ""
        ) : (
          <Button
            // onClick={() => {
            //   setParam({ id, payment, status }), setOpen(true);
            // }}
            onClick={() => handlePay(id, total)}
            variant={"ghost"}
            className="bg-gray-900 md:w-fit w-full text-white hover:bg-transparent hover:text-gray-800 uppercase font-semibold py-6 px-8 rounded border-2 border-gray-900 cursor-pointer"
          >
            Pay Now
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserOrder;

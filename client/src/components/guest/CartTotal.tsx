import React, { useState } from "react";
import { Button } from "../ui/button";
import Skeleton from "./Skeleton";

type Product = {
  id: string;
  price: number;
  imageUrl: string[];
  title: string;
};
type cartItem = {
  count: number;
  subtotal: number;
  product: Product;
  active: boolean;
};

const CartTotal = ({
  carts,
  handleClick,
}: {
  carts: cartItem[];
  handleClick: () => void;
}) => {
  if (carts === undefined || carts.length === 0) {
    return (
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-5">CART TOTALS</h2>
        <div className="flex justify-between py-2 border-b border-gray-200">
          <span className="text-gray-700">Subtotal</span>
          <span className="font-semibold">
            <Skeleton />
          </span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-200">
          <span className="text-gray-700">Shipping Fee</span>
          <span className="font-semibold">
            <Skeleton />
          </span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-gray-700 font-semibold">Total</span>
          <span className="text-xl font-bold">
            <Skeleton />
          </span>
        </div>
        <Button
          variant={"ghost"}
          className="bg-gray-900 md:w-fit w-full text-white hover:bg-transparent hover:text-gray-800 uppercase font-semibold py-6 px-8 rounded border-2 border-gray-900 cursor-pointer"
        >
          PROCEED TO CHECKOUT
        </Button>
      </div>
    );
  }
  const subtotal = carts
    .filter((item) => item.active === true)
    .reduce((prev, curr) => prev + curr.subtotal, 0);
  const shippingFee = 10000;
  const total = subtotal + shippingFee;
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-5">CART TOTALS</h2>
      <div className="flex justify-between py-2 border-b border-gray-200">
        <span className="text-gray-700">Subtotal</span>
        <span className="font-semibold">${subtotal.toLocaleString()}</span>
      </div>
      <div className="flex justify-between py-2 border-b border-gray-200">
        <span className="text-gray-700">Shipping Fee</span>
        <span className="font-semibold">${shippingFee.toLocaleString()}</span>
      </div>
      <div className="flex justify-between py-2">
        <span className="text-gray-700 font-semibold">Total</span>
        <span className="text-xl font-bold">${total.toLocaleString()}</span>
      </div>
      <Button
        onClick={() => handleClick()}
        variant={"ghost"}
        className="bg-gray-900 md:w-fit w-full text-white hover:bg-transparent hover:text-gray-800 uppercase font-semibold py-6 px-8 rounded border-2 border-gray-900 cursor-pointer"
      >
        PROCEED TO CHECKOUT
      </Button>
    </div>
  );
};

export default CartTotal;

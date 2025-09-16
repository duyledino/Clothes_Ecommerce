"use client";
import {
  StaticImageData,
  StaticImport,
} from "next/dist/shared/lib/get-img-props";
import React, {
  InputEventHandler,
  use,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { Input } from "../ui/input";
import { Trash } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { toast } from "react-toastify";
import {
  fetchApiAddToCart,
  fetchApiCart,
  refeshAddToCart,
} from "@/slice/CartSlice";
import Loading from "../ui/Loading";
import { title } from "process";

type Item = {
  active: boolean;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string[];
  size: string;
  localStore: string | null;
  handleChange: (
    value: string | null,
    productId: string,
    image: string[],
    title: string,
    price: number,
    quantity: number,
    active: boolean,
    size: string
  ) => void;
  handleDelete: (productId: string,size:string) => void;
};

const CartIem = ({
  productId,
  name,
  price,
  quantity,
  image,
  active,
  size,
  handleChange,
  handleDelete,
}: Item) => {
  const { loading } = useAppSelector((state) => state.CartSlice);
  const [quan, setQuan] = useState<string | number>(quantity);
  const [click, setClick] = useState<boolean>(active);
  const [activate, setActivate] = useState<boolean | null>(null);
  console.log("size in cartItem : ", size);
  console.log("activate,active in cartItem: ",activate,active);
  useEffect(() => {
    const timeOutID = setTimeout(() => {
      console.log("trigger in quan, activate");
      if (typeof quan === "string" || activate !== null) {
        console.log("click: ", click);  
        console.log("activate: ", activate);
        handleChange(
          String(quan),
          productId,
          image,
          name,
          price,
          Number(quan),
          activate as boolean,
          size
        );
        setQuan((prev) => Number(prev));
        setActivate(null);
      }
    }, 800); // 0.8s debounce
    return () => clearTimeout(timeOutID);
  }, [quan, activate]);
  return (
    <>
      <div className={`flex items-center gap-2`}>
        <div
          className={`w-5 h-5 ring-1 hover:cursor-pointer border-none ${
            click ? "bg-green-300" : "bg-transparent"
          }`}
          onClick={() => {
            setClick((prev) => {
              const newValue = !prev;
              setActivate(newValue); // keep activate in sync
              return newValue;
            });
          }}
        ></div>
        <div
          key={productId}
          className={`flex sm:flex-nowrap flex-wrap sm:gap-0 gap-y-3.5 flex-1 items-center py-4 border-b border-gray-200  `}
        >
          <img
            src={image[0]}
            alt={name}
            width={390}
            height={450}
            className="w-20 h-auto object-cover mr-4"
          />
          <div className="flex-grow max-w-xl">
            <h3 className="md:text-lg sm:text-[14px] text-xs font-medium">
              {name}
            </h3>
            <div className="flex items-center">
              <span className="text-gray-700">{price.toLocaleString()}</span>
              <span className="ml-2 px-2 py-1 text-xs border border-gray-400 bg-gray-100">
                {size}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between flex-1">
            <Input
              onChange={(e) => setQuan(prev=>{
                prev=e.target.value;
                setActivate(click);
                return prev
              })}
              type="number"
              value={quan}
              disabled={loading}
              min={1}
              className="md:w-36 w-16 px-2 py-1 text-center border border-gray-300 rounded"
            />
            <p className="text-black">{(price * quantity).toLocaleString()}</p>
            <button
              className="ml-4 text-gray-600 hover:text-red-600 focus:outline-none cursor-pointer"
              onClick={() => handleDelete(productId,size)}
            >
              <Trash className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartIem;

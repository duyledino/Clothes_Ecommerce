import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  fetchApiAddToCart,
  fetchApiCart,
  refeshAddToCart,
} from "@/slice/CartSlice";
import { toast } from "react-toastify";
import Loading from "../ui/Loading";
type ProductData = {
  id: string;
  title: string;
  price: number;
  imageUrl: string[];
  size: string;
};
const AddToCart = ({
  product,
  price,
}: {
  product: ProductData;
  price: number;
}) => {
  const { carts, error, loading, Message } = useAppSelector(
    (state) => state.CartSlice
  );
  const [localStore, setLocalStore] = useState(() => {
    return localStorage.getItem("user");
  });
  useEffect(() => {
    if (localStore === undefined || localStore === null) {
      toast.error("No token");
      return;
    }
  }, []);
  console.log("carts: ", carts);
  const dispatch = useAppDispatch();
  const handleAddToCart = () => {
    if (product.size === "") {
      toast.error("Product size is missing");
      return;
    }
    const item = carts.find(
      (item) => item.product.id === product.id && item.size === product.size
    );
    console.log("item in add to cart: ", item);
    let objectItem: {
      product: ProductData;
      count: number;
      subtotal: number;
      active: boolean;
      size: string;
    } = {
      product: { id: "", title: "", price: 0, imageUrl: [], size: "" },
      count: 0,
      subtotal: 0,
      active: false,
      size: "",
    };
    if (item) {
      objectItem["product"] = item.product;
      objectItem["count"] = item.count + 1;
      objectItem["subtotal"] = item.subtotal + item.product.price;
      objectItem["active"] = item.active;
      objectItem["size"] = item.size;
    } else {
      objectItem["product"] = product;
      objectItem["count"] = 1;
      objectItem["subtotal"] = price;
      objectItem["active"] = true;
      objectItem["size"] = product.size;
    }
    const localStore = localStorage.getItem("user");
    if (localStore === undefined || localStore === null) {
      toast.error("No token");
      return;
    }
    const { token, id } = JSON.parse(localStore);
    // pass token and user id
    dispatch(fetchApiAddToCart({ cartItem: objectItem, id: id, token: token }));
  };
  useEffect(() => {
    if (Message && !error) {
      if (localStore === undefined || localStore === null) {
        toast.error("No token");
        return;
      }
      const { token, id } = JSON.parse(localStore);
      toast.success(Message);
      dispatch(refeshAddToCart());
      dispatch(fetchApiCart({ id: id, token: token }));
    }
    if (error) {
      toast.error(error);
    }
  }, [Message, error]);
  return (
    <>
      {loading && <Loading />}
      <Button
        disabled={loading}
        onClick={handleAddToCart}
        variant={"ghost"}
        className="bg-gray-900 w-fit text-white hover:bg-transparent hover:text-gray-800 uppercase font-semibold py-6 px-8 rounded border-2 border-gray-900 cursor-pointer"
      >
        Add to cart
      </Button>
    </>
  );
};

export default AddToCart;

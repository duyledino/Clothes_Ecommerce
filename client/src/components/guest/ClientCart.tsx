import React, { useEffect, useState } from "react";
import { Trash } from "lucide-react";
import { Input } from "../ui/input";
import img1 from "@/assets/frontend_assets/p_img1.png";
import img2 from "@/assets/frontend_assets/p_img2.png";
import CartIem from "./CartIem";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { toast } from "react-toastify";
import {
  fetchApiAddToCart,
  fetchApiCart,
  fetchApiDeleteACart,
  refeshAddToCart,
} from "@/slice/CartSlice";
import Loading from "../ui/Loading";
type Product = {
  id: string;
  price: number;
  imageUrl: string[];
  title: string;
  size: string;
};
type cartItem = {
  count: number;
  subtotal: number;
  product: Product;
  active: boolean;
  size: string;
};

const ClientCart = ({ carts }: { carts: cartItem[] }) => {
  // const { carts } = useAppSelector((state) => state.CartSlice);
  // console.log("carts in page cart: ", carts);
  const [localStore, setLocalStore] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (typeof window !== "undefined") {
      setLocalStore(localStorage.getItem("user"));
    }
  }, []);
  const { Message, error, loading } = useAppSelector(
    (state) => state.CartSlice
  );
  const handleChange = (
    value: string | null,
    productId: string,
    image: string[],
    title: string,
    price: number,
    quantity: number,
    active: boolean,
    size: string
  ) => {
    console.log("change");
    console.log("active in client cart: ", active);
    if (localStore === undefined || localStore === null) {
      toast.error("No token");
      return;
    }
    const { token, id } = JSON.parse(localStore);
    const userId: string = id;
    const Product: Product = {
      id: productId,
      imageUrl: image,
      price: price,
      title: title,
      size: size,
    };
    dispatch(
      fetchApiAddToCart({
        cartItem: {
          product: Product,
          count: Number(value),
          subtotal: price * quantity,
          active: active,
          size: size,
        },
        id: userId,
        token: token,
      })
    );
  };
  useEffect(() => {
    if (Message && !error) {
      if (localStore === undefined || localStore === null) {
        toast.error("No token");
        return;
      }
      const { token, id } = JSON.parse(localStore);
      console.log("token, id: ", token, id);
      toast.success(Message);
      dispatch(refeshAddToCart());
      dispatch(fetchApiCart({ id: id, token: token }));
    }
    if (error) {
      toast.error(error);
    }
  }, [Message, error, localStore]);
  // const cartItems = [
  //   {
  //     id: 1,
  //     name: "Men Round Neck Pure Cotton T-shirt",
  //     price: 64,
  //     size: "XXL",
  //     quantity: 7,
  //     image: img1, // Replace with actual image path
  //   },
  //   {
  //     id: 2,
  //     name: "Women Zip-Front Relaxed Fit Jacket",
  //     price: 74,
  //     size: "L",
  //     quantity: 14,
  //     image: img2, // Replace with actual image path
  //   },
  // ];
  const handleDelete = (productId: string, size: string) => {
    if (localStore === undefined || localStore === null) {
      toast.error("No token");
      return;
    }
    const { token, id } = JSON.parse(localStore);
    dispatch(
      fetchApiDeleteACart({
        userId: id,
        productId: productId,
        size: size,
        token: token,
      })
    );
  };
  console.log("carts in page cart: ", carts);
  return (
    <div>
      {loading && <Loading />}
      <h2 className="text-2xl font-semibold mb-5">YOUR CART</h2>
      {carts.map((item) => (
        <CartIem
          active={item.active}
          key={`${item.product.id}${item.size}`}
          localStore={localStore}
          productId={item.product.id}
          name={item.product.title}
          price={item.product.price}
          size={item.size}
          quantity={item.count}
          image={item.product.imageUrl}
          handleChange={handleChange}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default ClientCart;

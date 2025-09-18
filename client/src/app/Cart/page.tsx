"use client";
import React, { useEffect, useState } from "react";
import CartTotal from "@/components/guest/CartTotal";
import ClientCart from "@/components/guest/ClientCart";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchCreateOrder, resetState } from "@/slice/OrderSlice";
import { toast } from "react-toastify";
import Loading from "@/components/ui/Loading";
import { fetchApiCart } from "@/slice/CartSlice";
import { fetchApiPaymentURL } from "@/slice/PaymentSlice";

const CartPage = () => {
  const [localStore, setLocalStore] = useState<string | null>(null);
  const [process, setProcess] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { carts } = useAppSelector((state) => state.CartSlice);
  const { MessageOrder, errorOrder, loadingOrder, orderId } = useAppSelector(
    (state) => state.OrderSlice
  );
  const { PaymentURL, paymentError, paymentLoading } = useAppSelector(
    (state) => state.PaymentSlice
  );
  useEffect(() => {
    if (typeof window !== "undefined") {
      setLocalStore(localStorage.getItem("user"));
    }
  }, []);
  //NOTE: handle "Proceed to checkout" button
  const handleCLick = () => {
    if (localStore === undefined || localStore === null) {
      toast.error("No token");
      return;
    }
    const { token, id } = JSON.parse(localStore);
    dispatch(
      fetchCreateOrder({
        id: id,
        token: token,
        detail: carts
          .filter((item) => item.active === true)
          .map((item) => ({
            productId: item.product.id,
            count: item.count,
            subTotal: item.subtotal,
            size: item.size,
          })),
      })
    );
  };
  //NOTE:check Message or error after fetch api
  useEffect(() => {
    if (MessageOrder && !errorOrder) {
      toast.success(MessageOrder);
      if (localStore === undefined || localStore === null) {
        toast.error("No token");
        return;
      }
      const { token, id } = JSON.parse(localStore);
      dispatch(fetchApiCart({ id: id, token: token }));
      dispatch(resetState());
    }
    if (errorOrder || paymentError) {
      const e = errorOrder || paymentError;
      toast.error(e);
    }
    if (PaymentURL) {
      window.location.href = PaymentURL;
      setProcess(true);
    }
  }, [PaymentURL, paymentError, MessageOrder, errorOrder]);
  //NOTE:check local storage is change ?
  useEffect(() => {
    const storageChange = () => {
      const result = localStorage.getItem("payment_result");
      if (result !== null || result !== undefined) {
        setProcess(false);
        toast.info(JSON.parse(result as string));
        localStorage.removeItem("payment_result");
      }
    };
    window.addEventListener("storage", storageChange);
    return () => window.removeEventListener("storage", storageChange);
  }, []);
  //NOTE: handle orderId after fetch api create an order
  useEffect(() => {
    if (orderId !== null) {
      if (localStore === undefined || localStore === null) {
        toast.error("No token");
        return;
      }
      const total = carts
        .filter((item) => item.active === true)
        .reduce((prev, curr) => prev + curr.subtotal, 0);
      const { token } = JSON.parse(localStore);
      const OrderId = orderId as string;
      dispatch(fetchApiPaymentURL({ id: OrderId, token, total: total }));
    }
  }, [orderId]);
  return (
    <>
      {(loadingOrder || paymentLoading || process) && <Loading />}
      <div className="container mx-auto pt-14">
        <div className="w-full px-3.5 flex flex-col">
          <div className="lg:w-full">
            <ClientCart carts={carts} />
          </div>
          <div className="lg:w-2/5 w-full md:self-end">
            <CartTotal carts={carts} handleClick={handleCLick} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;

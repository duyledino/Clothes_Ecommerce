"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useSearchParams } from "next/navigation";
import { fetchUpdateOrder } from "@/slice/OrderSlice";
import { toast } from "react-toastify";

function PaymentContent() {
  const { loadingOrder, errorOrder, MessageOrder } = useAppSelector(
    (state) => state.OrderSlice
  );
  const [stateTrans, setstateTrans] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const searchParam = useSearchParams();

  const id = searchParam.get("id");
  const vnp_TransactionStatus = searchParam.get("vnp_TransactionStatus");

  useEffect(() => {
    if (!id) return; // ✅ simpler null check

    const localStore = localStorage.getItem("user");
    if (!localStore) {
      toast.error("No token");
      return;
    }

    const { token } = JSON.parse(localStore);
    const Id: string = id;

    console.log("order id,vnp_TransactionStatus : ", Id, vnp_TransactionStatus);

    if (vnp_TransactionStatus === "02") {
      setstateTrans("Failed to finish transaction");
    } else if (vnp_TransactionStatus === "01") {
      setstateTrans("Transaction is not completed");
    } else {
      dispatch(
        fetchUpdateOrder({
          order: { id: Id, payment: "Done", status: "Order Placed" },
          token,
        })
      );
    }
  }, [id, vnp_TransactionStatus, dispatch]);

  useEffect(() => {
    if (MessageOrder && !errorOrder) {
      localStorage.setItem("payment_result", JSON.stringify(MessageOrder));
    }
    if (errorOrder) {
      setstateTrans(errorOrder);
    }
  }, [errorOrder, MessageOrder]);

  useEffect(() => {
    if (stateTrans !== null) {
      localStorage.setItem("payment_result", JSON.stringify(stateTrans));
    }
  }, [stateTrans]);

  return (
    <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6">
        {(loadingOrder || !id) && (
          <div className="animate-pulse">
            <p className="text-xl font-semibold">Processing your payment...</p>
            <div className="mt-4 h-4 bg-gray-300 rounded w-2/3 mx-auto" />
          </div>
        )}

        {(errorOrder || stateTrans !== null) && (
          <div className="text-red-600">
            <p className="text-xl font-semibold">Payment Failed</p>
            <p className="mt-2">{errorOrder ?? stateTrans}</p>
          </div>
        )}

        {!loadingOrder && !errorOrder && MessageOrder && (
          <div className="text-green-600">
            <p className="text-xl font-semibold">Payment Successful!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Payment() {
  return (
    <Suspense
      fallback={
        <p className="text-xl font-semibold">Loading payment page...</p>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}

"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import OrderItem from "@/components/admin/OrderItem";
import Pagination from "@/components/guest/Pagination";
import { fetchApiAllOrder } from "@/slice/OrderSlice";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const { Orders, error, loading } = useAppSelector(
    (state) => state.OrderSlice
  );
  console.log("Orders: ",Orders);
  useEffect(() => {
    const localStore = localStorage.getItem("user");
    if (localStore === undefined || localStore === null) {
      toast.error("No token");
      return;
    }
    const token = JSON.parse(localStore).token;
    dispatch(fetchApiAllOrder({ token, page: page }));
  }, [page]);
  return (
    <div>
      <h1 className="mb-3 text-gray-900">Products</h1>
      <ul className="flex flex-col gap-3">
        {Orders.length > 0
          ? Orders.map((item) => (
              <OrderItem
                detail={item.details}
                payment={item.payment}
                status={item.status}
                total={item.total}
                update={item.update}
                user={item.user}
                key={item.id}
              />
            ))
          : ""}
      </ul>
      <Pagination
        categories={null}
        page={page}
        pageName="order"
        setPage={setPage}
        subcategory={null}
      />
    </div>
  );
};

export default page;

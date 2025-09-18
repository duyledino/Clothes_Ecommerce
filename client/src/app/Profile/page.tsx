"use client";
import React, { useEffect, useState } from "react";
import UserInfo from "@/components/guest/UserInfo";
import UserOrder from "@/components/guest/UserOrder";
import { useAppDispatch, useAppSelector } from "../hooks";
import { toast } from "react-toastify";
import { fetchGetOrdersById, fetchUpdateOrder } from "@/slice/OrderSlice";
import Loading from "@/components/ui/Loading";
import Modal from "@/components/guest/Modal";
import { fetchApiPaymentURL } from "@/slice/PaymentSlice";
import { updateUserSchema } from "@/schema/auth";
import { fetchUserById } from "@/slice/UserSlice";
import { userAgent } from "next/server";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
type paymentAndStatus = {
  // orderId
  id: string | undefined;
  //can be an empty string
  payment: string | undefined;
  //can be an empty string
  status: string | undefined;
};

const Profile = () => {
  const [param, setParam] = useState<paymentAndStatus>({
    id: undefined,
    payment: undefined,
    status: undefined,
  });
  const router = useRouter();
  const [process, setProcess] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [localStore, setLocalStore] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      console.log("user: ", user);
      setLocalStore(localStorage.getItem("user"));
    }
  }, []);
  const { MessageOrder, loadingOrder, errorOrder, OrdersUser } = useAppSelector(
    (state) => state.OrderSlice
  );
  const { PaymentURL, paymentError, paymentLoading } = useAppSelector(
    (state) => state.PaymentSlice
  );
  const { User, errorUser, loadingUser } = useAppSelector(
    (state) => state.UserSlice
  );
  const dispatch = useAppDispatch();
  const handleChange = ({
    id,
    status,
    payment,
  }: {
    id: string;
    payment: string;
    status: string;
  }) => {
    console.log("id, status, payment: ", id, status, payment);
    if (localStore === undefined || localStore === null) {
      toast.error("No token");
      return;
    }
    if (payment === undefined || id === undefined || status === undefined) {
      toast.error("Cannot modify order now");
      return;
    }
    const token = JSON.parse(localStore).token;
    dispatch(
      fetchUpdateOrder({
        order: { id, payment: "Cancel", status: "Cancel" },
        token,
      })
    );
  };
  const handlePay = (orderId: string, total: number) => {
    if (orderId === undefined || orderId === "" || total === undefined) {
      toast.error("Cannot pay now");
      return;
    }
    if (localStore === undefined || localStore === null) {
      toast.error("No token");
      return;
    }
    const { token, id } = JSON.parse(localStore);
    dispatch(fetchApiPaymentURL({ id: orderId, token: token, total: total }));
  };
  useEffect(() => {
    if (errorOrder) {
      toast.error(errorOrder);
    }
    if (MessageOrder && !errorOrder) {
      if (localStore === undefined || localStore === null) {
        toast.error("No token");
        return;
      }
      const { token, id } = JSON.parse(localStore);
      setOpen(false);
      dispatch(fetchGetOrdersById({ id, token }));
      toast.success(MessageOrder);
    }
  }, [errorOrder, MessageOrder]);
  useEffect(() => {
    if (localStore === undefined || localStore === null) {
      return;
    }
    const { token, id } = JSON.parse(localStore);
    dispatch(fetchGetOrdersById({ id, token }));
    const storageChange = () => {
      const result = localStorage.getItem("payment_result");
      if (result !== null || result !== undefined) {
        setProcess(false);
        dispatch(fetchGetOrdersById({ id, token }));
        toast.info(JSON.parse(result as string));
        localStorage.removeItem("payment_result");
      }
    };
    dispatch(fetchUserById({ id: id, token }));
    window.addEventListener("storage", storageChange);
    return () => window.removeEventListener("storage", storageChange);
  }, [localStore]);
  useEffect(() => {
    if (paymentError) {
      toast.error(paymentError);
    }
    if (PaymentURL && !paymentError) {
      setProcess(true);
      window.open(PaymentURL,'_blank');
    }
  }, [paymentError, PaymentURL]);
  console.log("OrderUser: ", OrdersUser);
  console.log("User: ", User);
  return (
    <>
      {process && <Loading />}
      {loadingOrder && <Loading />}
      {loadingUser && <Loading />}
      <Modal
        handleClick={handleChange}
        content="This action cannot be changed anymore"
        open={open}
        setOpen={setOpen}
        params={param}
      />

      {localStore ? (
        <div className="container mx-auto">
          <div className="w-full pt-14 md:px-0 px-4">
            {localStore &&
            JSON.parse(localStore).id !== "" &&
            !JSON.parse(localStore).admin ? (
              <div className="w-full flex justify-end">
                <Button
                  onClick={() => {
                    localStorage.removeItem("user");
                    router.push("/");
                    toast.success("Logout successfully");
                  }}
                  className="bg-gray-900 w-fit rounded-full text-white hover:bg-transparent hover:text-gray-800 uppercase font-semibold py-6 px-8 border-2 border-gray-900 cursor-pointer"
                >
                  Logout
                </Button>
              </div>
            ) : (
              ""
            )}
            {User === null ? (
              <UserInfo
                address=""
                id="123"
                email="test@example.com"
                name="Test User"
              />
            ) : (
              <UserInfo
                address={User.address}
                id={User.id}
                email={User.email}
                name={User.name}
              />
            )}
            {OrdersUser.length === 0 ? (
              <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1>No Order Yet.</h1>
              </div>
            ) : (
              OrdersUser.map((item) => (
                <UserOrder
                  key={item.id}
                  address={item.user.address}
                  handlePay={handlePay}
                  setParam={setParam}
                  setOpen={setOpen}
                  id={item.id}
                  userId={item.user.id}
                  total={item.total}
                  date={item.update.toLocaleString().split("T")[0]}
                  status={item.status}
                  payment={item.payment}
                  details={item.details}
                />
              ))
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Profile;

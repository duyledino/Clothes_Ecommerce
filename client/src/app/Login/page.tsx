"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { authSchema } from "@/schema/auth";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useAppSelector } from "../hooks";
import { fetchLogin } from "@/slice/UserSlice";
import Loading from "@/components/ui/Loading";
import { useRouter } from "next/navigation";
import { createChat, fetchChatsByUserId } from "@/slice/ChatSlice";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  const { loadingChat, errorChat, chats } = useAppSelector(
    (state) => state.ChatSlice
  );
  const { loadingUser, data, errorUser } = useAppSelector(
    (state) => state.UserSlice
  );
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const checkResult = authSchema.safeParse(formData);
    if (!checkResult.success) {
      toast.error(checkResult.data);
    } else {
      dispatch(fetchLogin(formData));
    }
  };
  useEffect(() => {
    if (data && !errorUser) {
      console.log(data?.Message);
      toast.success(data?.Message);
      console.log("user: ", data);
      localStorage.setItem(
        "user",
        JSON.stringify({
          token: data?.token,
          admin: data?.admin,
          email: data.email,
          id: data.id,
        })
      );
      dispatch(fetchChatsByUserId({ token: data.token, userId: data.id }));
      router.push("/");
    }
    if (errorUser) {
      toast.error(errorUser);
    }
    if (errorChat) {
      toast.error(errorChat);
    }
  }, [data, errorUser]);
  console.log("Chat in login: ", chats);
  useEffect(() => {
    if (chats?.length === 0) {
      const localStore = localStorage.getItem("user");
      if (localStore === undefined || localStore === null) {
        toast.error("No token");
        return;
      }
      const { token, id, admin } = JSON.parse(localStore);
      console.log("admin: ", admin);
      if (!admin) {
        console.log("admin: ", admin);
        dispatch(createChat({ token, userId: id }));
      }
    }
  }, [chats]);
  return (
    <>
      {loadingUser || loadingChat ? <Loading /> : ""}
      <div className="flex min-h-screen bg-white">
        <div className="container mx-auto p-8 my-16 max-w-md">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8">
            Login to Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="block w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="block w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-3 rounded-full hover:bg-gray-800 transition duration-200 font-semibold"
            >
              Login
            </button>
          </form>
          <p className="text-center mt-4 text-gray-600">
            Don't have an account?{" "}
            <Link href="/Signup" className="text-gray-900 underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;

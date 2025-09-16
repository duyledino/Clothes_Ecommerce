"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signupSchema } from "@/schema/auth";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchSignup } from "@/slice/UserSlice";
import Loading from "@/components/ui/Loading";
import { useRouter } from "next/navigation";
import { createChat } from "@/slice/ChatSlice";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data, errorUser, loadingUser } = useAppSelector(
    (state) => state.UserSlice
  );
  const { errorChat, loadingChat } = useAppSelector((state) => state.ChatSlice);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const check = signupSchema.safeParse(formData);
    // Add signup logic here
    if (!check.success) {
      toast.error(JSON.parse(check.error?.message as string)[0].message);
    } else {
      dispatch(
        fetchSignup({ email: formData.email, password: formData.password })
      );
    }
  };

  useEffect(() => {
    if (data && !errorUser) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.id,
          email: data.email,
          admin: data.admin,
          token: data.token,
        })
      );
      //get from localStorage after save it
      const localStore = localStorage.getItem("user");
      if (localStore === undefined || localStore === null) {
        toast.error("No token");
        return;
      }
      const { token, id } = JSON.parse(localStore);
      dispatch(createChat({ token: token, userId: id }));
      toast.success(data.Message);
      router.push("/");
    }
    if (errorUser) {
      toast.error(errorUser);
    }
    if (errorChat) {
      toast.error(errorChat);
    }
  }, [data, errorUser]);

  return (
    <>
      {loadingUser || loadingChat ? <Loading /> : ""}
      <div className="flex min-h-screen bg-white items-center justify-center">
        <div className="container mx-auto p-8 my-16 max-w-md bg-white shadow-md rounded-lg">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
            Create Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="block w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="block w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="block w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-3 rounded-full hover:bg-gray-800 transition duration-200 font-semibold"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link href="/Login" className="text-gray-900 underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;

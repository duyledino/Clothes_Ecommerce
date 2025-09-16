"use client";
import React, { useEffect, useState } from "react";
import logo from "@/assets/frontend_assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import Nav from "./Nav";
import Handle from "./Handle";
import MobileNav from "./MobileNav";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchApiCart } from "@/slice/CartSlice";
import Loading from "../ui/Loading";
import { toast } from "react-toastify";

const Header = () => {
  const { error, loading, carts } = useAppSelector((state) => state.CartSlice);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const localStore = localStorage.getItem("user");
    const user = localStore !== null ? JSON.parse(localStore) : null;
    if (user) {
      dispatch(fetchApiCart({ id: user.id, token: user.token }));
    }
  }, [dispatch]);
  useEffect(() => {
    console.log("carts: ", carts);
  }, [carts]);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  return (
    <>
      {loading && <Loading />}
      <header className="w-full h-24 backdrop-blur-xs sticky z-50 top-0 left-0 bg-white/55 shadow-[0_1px_2px_rgba(0,0,0,0.5)] md:p-0 px-2">
        <div className="container m-auto h-full flex items-center justify-between">
          <Link href={"/"}>
            <Image
              src={logo}
              alt="logo"
              className="w-36 h-auto object-contain"
            />
          </Link>
          <Nav />
          <Handle carts={carts} />
        </div>
      </header>
    </>
  );
};

export default Header;

"use client";
import BestSeller from "@/components/guest/BestSeller";
import Header from "@/components/guest/Header";
import Hero from "@/components/guest/Hero";
import Latest from "@/components/guest/Latest";
import Subcribe from "@/components/guest/Subcribe";
import Support from "@/components/guest/Support";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchApiCart } from "@/slice/CartSlice";

function Page() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  
  return (
    // <Header/>
    <>
      <Hero />
      <Latest />
      <BestSeller />
      <Support />
      <Subcribe />
    </>
  );
}

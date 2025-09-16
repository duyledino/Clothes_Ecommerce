"use client";
import Sidebar from "@/components/admin/Sidebar";
import Dashboard from "@/components/admin/Dashboard";
import { usePathname } from "next/navigation";
import React from "react";

const page = () => {
  return (
    <>
      <Dashboard />
    </>
  );
};

export default page;

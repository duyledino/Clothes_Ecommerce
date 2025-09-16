"use client";
import Sidebar from "@/components/admin/Sidebar";
import Dashboard from "@/components/admin/Dashboard";
import { usePathname } from "next/navigation";
import React from "react";

function Page() {
  return (
    <>
      <Dashboard />
    </>
  );
};

export default Page;

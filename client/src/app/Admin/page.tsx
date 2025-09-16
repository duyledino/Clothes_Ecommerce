"use client";
import Sidebar from "@/components/admin/Sidebar";
import Dashboard from "@/components/admin/Dashboard";
import { usePathname } from "next/navigation";
import React from "react";

function Admin() {
  return (
    <>
      <Dashboard />
    </>
  );
};

export default Admin;

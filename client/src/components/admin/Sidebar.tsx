"use client";
import {
  Barcode,
  ChartNoAxesCombined,
  CirclePlus,
  MessageCircleMore,
  PackageSearch,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
const nav = [
  {
    link: "/Admin",
    name: "Dashboard",
    logo: (className: string) => <ChartNoAxesCombined className={className} />,
  },
  {
    link: "/Admin/Add",
    name: "Add Item",
    logo: (className: string) => <CirclePlus className={className} />,
  },
  {
    link: "/Admin/Products",
    name: "Products",
    logo: (className: string) => <Barcode className={className} />,
  },
  {
    link: "/Admin/Orders",
    name: "Orders",
    logo: (className: string) => <PackageSearch className={className} />,
  },
  {
    link: "/Admin/Chat",
    name: "Chat",
    logo: (className: string) => <MessageCircleMore  className={className} />,
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="h-[90vh] md:w-2xs w-20 pt-4 pl-9 border-r-2">
      <div className="w-full flex flex-col gap-5">
        {nav.map((item) => (
          <Link href={item.link} key={item.link}>
            <div
              className={`flex items-center gap-7 p-2 transition-all hover:ring-2 hover:ring-gray-900 border-1 ${
                pathname === item.link ? "bg-gray-900" : ""
              }`}
            >
              {item.logo(`${pathname === item.link ? 'text-white' : 'text-black'}`)}
              <h1
                className={`md:block hidden ${
                  pathname === item.link ? "text-white" : "text-black"
                }`}
              >
                {item.name}
              </h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

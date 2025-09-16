"use client";
import React from "react";
import { assets } from "@/assets/frontend_assets/assets.js";
import Link from "next/link";
import Image from "next/image";
import MobileNav from "./MobileNav";
import { setShow } from "@/slice/SearchBarSlice";
import { useAppDispatch } from "@/app/hooks";
import { useRouter } from "next/navigation";

type saveUserInfo = {
  token: string;
  admin: boolean;
};

const NavLink = [
  {
    logo: assets.search_icon,
  },
  {
    logo: assets.profile_icon,
    link: "Profile",
  },
  {
    logo: assets.cart_icon,
    link: "/Cart",
  },
];
type Product = {
  id: string;
  price: number;
  imageUrl: string[];
  title: string;
};
type cartItem = { count: number; subtotal: number; product: Product };

const Handle = ({ carts }: { carts: cartItem[] }) => {
  // Since I only have 1 object has property link is undefined so just useDispatch and navigate to Collection page
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleClick = (link: string | undefined) => {
    if (link === undefined) {
      dispatch(setShow(true));
      router.push("/Collection");
    } else {
      const localStore = localStorage.getItem("user");
      const user: saveUserInfo =
        localStore !== null
          ? JSON.parse(localStore)
          : { token: null, admin: false };
      if (user.token === null) router.push("/Login");
      else router.push("/Profile");
    }
  };
  return (
    <nav className="h-full flex justify-center items-center">
      <ul className="flex gap-6 items-center">
        {NavLink.map((item, index) => {
          if (item.link === undefined)
            return (
              <li className="" key={index}>
                <div
                  onClick={() => handleClick(item.link)}
                  className="cursor-pointer"
                >
                  <Image src={item.logo} alt="util" className="w-5 h-auto" />
                </div>
              </li>
            );
          else if (item.link === "Profile") {
            return (
              <li className="" key={index}>
                <div
                  onClick={() => handleClick(item.link)}
                  className="cursor-pointer"
                >
                  <Image src={item.logo} alt="util" className="w-5 h-auto" />
                </div>
              </li>
            );
          }
          return (
            <li className="relative" key={index}>
              {carts !== undefined && carts.length > 0 ? (
                <div className="flex justify-center items-center bg-black text-white w-4 h-4 rounded-[50%] absolute -top-2 -right-2 text-[12px]">
                  {carts.reduce((prev, curr) => prev + curr.count, 0)}
                </div>
              ) : (
                ""
              )}
              <Link href={item.link}>
                <Image src={item.logo} alt="util" className="w-5 h-auto" />
              </Link>
            </li>
          );
        })}
        <MobileNav />
      </ul>
    </nav>
  );
};

export default Handle;

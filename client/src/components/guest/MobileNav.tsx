"use client";
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/frontend_assets/assets";
import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";

const navLinks = [
  { name: "home", link: "/" },
  { name: "Collection", link: "/Collection" },
  { name: "About", link: "/About" },
  { name: "Contact", link: "/Contact" },
];

const MobileNav = () => {
  const [localStore, setLocalStore] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setLocalStore(localStorage.getItem("user"));
    }
  }, []);
  const [open, setOpen] = useState<boolean | undefined>(false);
  const path = usePathname();
  return (
    <>
      {localStore ? (
        <>
          <div
            className="md:hidden block cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          >
            <Image src={assets.menu_icon} alt="menu" className="w-6" />
          </div>
          <Sheet open={open} onOpenChange={() => setOpen((prev) => !prev)}>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  <Image src={assets.logo} alt="logo" className="w-36" />
                </SheetTitle>
              </SheetHeader>
              <div className="grid flex-1 auto-rows-min gap-6 px-4">
                {navLinks.map((item) => (
                  <div className="grid gap-3">
                    <Link
                      onClick={() => setOpen((prev) => (prev = false))}
                      key={item.name}
                      href={item.link}
                      className={`uppercase w-full h-full ring-1 ring-black/30 px-5 py-2 rounded-[10px] text-center ${
                        path === item.link
                          ? "bg-foreground text-background"
                          : ""
                      } hover:bg-foreground hover:text-background transition-all`}
                    >
                      {item.name}
                    </Link>
                  </div>
                ))}
                {localStore &&
                  JSON.parse(localStore).id !== "" &&
                  !JSON.parse(localStore).admin && (
                    <div className="grid gap-3">
                      <Link
                        onClick={() => setOpen((prev) => (prev = false))}
                        href="/Chat"
                        className={`uppercase w-full h-full ring-1 ring-black/30 px-5 py-2 rounded-[10px] text-center ${
                          path === "/Chat"
                            ? "bg-foreground text-background"
                            : ""
                        } hover:bg-foreground hover:text-background transition-all`}
                      >
                        Admin
                      </Link>
                    </div>
                  )}
                {localStore &&
                  JSON.parse(localStore).id !== "" &&
                  JSON.parse(localStore).admin && (
                    <div className="grid gap-3">
                      <Link
                        onClick={() => setOpen((prev) => (prev = false))}
                        href="/Admin"
                        className={`uppercase w-full h-full ring-1 ring-black/30 px-5 py-2 rounded-[10px] text-center ${
                          path === "/Admin"
                            ? "bg-foreground text-background"
                            : ""
                        } hover:bg-foreground hover:text-background transition-all`}
                      >
                        Admin
                      </Link>
                    </div>
                  )}
              </div>
            </SheetContent>
          </Sheet>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default MobileNav;

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const navLinks = [
  { name: "home", link: "/" },
  { name: "Collection", link: "/Collection" },
  { name: "About", link: "/About" },
  { name: "Contact", link: "/Contact" },
];

const Nav = () => {
  const pathname = usePathname();
  const [localStore, setLocalStore] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setLocalStore(localStorage.getItem("user"));
    }
  }, []);
  return (
    <>
      {localStore ? (
        <nav className="h-full justify-center items-center md:flex hidden">
          <ul className="flex gap-5">
            {navLinks.map((item, index) => {
              return (
                <li key={index}>
                  <Link
                    href={item.link}
                    className={`uppercase relative hover:before:scale-100 hover:before:opacity-100 before:scale-0 before:absolute before:h-0.5 before:w-full before:left-0 before:bottom-0 before:bg-primary before:transition-all before:content-[''] ${
                      pathname === item.link
                        ? "before:opacity-100 before:scale-100"
                        : "before:opacity-0"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
            {localStore &&
              JSON.parse(localStore).id !== "" &&
              !JSON.parse(localStore).admin && (
                <li>
                  <Link
                    href={`/Chat`}
                    className={`uppercase relative hover:before:scale-100 hover:before:opacity-100 before:scale-0 before:absolute before:h-0.5 before:w-full before:left-0 before:bottom-0 before:bg-primary before:transition-all before:content-[''] ${
                      pathname === "/Chat"
                        ? "before:opacity-100 before:scale-100"
                        : "before:opacity-0"
                    }`}
                  >
                    Chat
                  </Link>
                </li>
              )}
            {localStore &&
              JSON.parse(localStore).id !== "" &&
              JSON.parse(localStore).admin && (
                <li>
                  <Link
                    href="/Admin"
                    className="uppercase w-full h-full ring-1 ring-black/30 px-5 py-2 rounded-full hover:bg-foreground hover:text-background transition-all"
                  >
                    Admin
                  </Link>
                </li>
              )}
          </ul>
        </nav>
      ) : (
        ""
      )}
    </>
  );
};

export default Nav;

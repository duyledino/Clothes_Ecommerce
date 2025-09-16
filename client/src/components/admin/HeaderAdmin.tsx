import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { assets } from "@/assets/admin_assets/assets";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const HeaderAdmin = () => {
  const router = useRouter();
  const [localStore, setLocalStore] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setLocalStore(localStorage.getItem("user"));
    }
  }, []);
  console.log("localStore admin:", localStore);
  return (
    <header className="w-full h-24 bg-white/55 shadow-[0_1px_2px_rgba(0,0,0,0.5)] md:p-0 px-2">
      <div className="container m-auto h-full flex items-center justify-between">
        <Link href={"/Admin"}>
          <Image
            src={assets.logo}
            alt="logo"
            className="w-36 h-auto object-contain"
          />
        </Link>
        {localStore && JSON.parse(localStore).admin ? (
          <Button
            onClick={() => {
              localStorage.removeItem("user");
              router.push("/");
              toast.success("Logout successfully");
            }}
            className="bg-gray-900 w-fit rounded-full text-white hover:bg-transparent hover:text-gray-800 uppercase font-semibold py-6 px-8 border-2 border-gray-900 cursor-pointer"
          >
            Logout
          </Button>
        ) : (
          ""
        )}
      </div>
    </header>
  );
};

export default HeaderAdmin;

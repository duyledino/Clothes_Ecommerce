import Image from "next/image";
import React from "react";
import { assets } from "@/assets/frontend_assets/assets";
import { Button } from "../ui/button";

const ContactUs = () => {
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto">
        <div className="flex justify-center items-center gap-4 w-full mb-14">
          <h2 className="text-xl font-semibold text-gray-500 rounded-full uppercase">
            Contact <span className="text-black">US</span>
          </h2>
          <p className="w-9 h-0.5 rounded-full bg-black"></p>
        </div>
        <div className="flex md:flex-row md:justify-center md:items-center flex-col gap-8">
          <div className="md:block flex justify-center items-center">
            <Image
              src={assets.contact_img}
              alt="aboutUs"
              className="w-md h-auto rounded-[14px]"
            />
          </div>
          <div className=" text-[14px] md:text-start text-center">
            <h3 className="text-2xl font-semibold text-gray-600 mb-4">
              Our Store
            </h3>
            <p className="text-gray-700 mb-2">54709 Willms Station</p>
            <p className="text-gray-700 mb-2">Suite 350, Washington, USA</p>
            <p className="text-gray-700 mb-2">Tel: (415) 555-0132</p>
            <p className="text-gray-700 mb-4">Email: admin@forever.com</p>
            <h3 className="text-2xl font-semibold text-gray-600 mb-4">
              Careers at Forever
            </h3>
            <p className="text-gray-700 mb-4">
              Learn more about our teams and job openings.
            </p>
            <Button
              variant={"ghost"}
              className="hover:bg-gray-900 hover:text-white text-gray-800 font-semibold py-6 px-8 rounded bg-transparent border-2 border-gray-900 cursor-pointer"
            >
              Explore Jobs
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

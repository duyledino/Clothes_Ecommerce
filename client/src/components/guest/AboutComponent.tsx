import Image from "next/image";
import React from "react";
import { assets } from "@/assets/frontend_assets/assets";

const AboutComponent = () => {
  return (
    <div className="container mx-auto py-12 md:px-0 px-3">
      <div className="w-full">
        <div className="flex justify-center items-center gap-4 w-full mb-14">
          <h2 className="text-xl font-semibold text-gray-500 rounded-full">
            ABOUT <span className="text-black">US</span>
          </h2>
          <p className="w-9 h-0.5 rounded-full bg-black"></p>
        </div>
        <div className="w-full flex md:flex-row flex-col gap-10 md:items-center">
          <div className="flex-1">
            <Image src={assets.about_img} alt="aboutUs" className="rounded-[14px]"/>
          </div>
          <div className="md:flex-2 w-full text-[14px]">
            <p className="text-gray-700 mb-4">
              Forever was born out of a passion for innovation and a desire to
              revolutionize the way people shop online. Our journey began with a
              simple idea: to provide a platform where customers can easily
              discover, explore, and purchase a wide range of products from the
              comfort of their homes.
            </p>
            <p className="text-gray-700 mb-4">
              Since our inception, we've worked tirelessly to curate a diverse
              selection of high-quality products that cater to every taste and
              preference. From fashion and beauty to electronics and home
              essentials, we offer an extensive collection sourced from trusted
              brands and suppliers.
            </p>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-700">
              Our mission at Forever is to empower customers with choice,
              convenience, and confidence. We're dedicated to providing a
              seamless shopping experience that exceeds expectations, from
              browsing and ordering to delivery and beyond.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutComponent;

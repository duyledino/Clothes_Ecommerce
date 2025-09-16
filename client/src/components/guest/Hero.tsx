"use client";
import React from "react";
import Image from "next/image";
import { assets } from "@/assets/frontend_assets/assets";

const Hero = () => {
  return (
    <div className="container xl:h-[78vh] md:h-[40vh] h-[100vh] m-auto">
      <div className="w-full h-full flex lg:gap-0 gap-5 lg:flex-row flex-col border-2">
        <div className="flex-1 lg:order-2 order-1 flex flex-col justify-center items-center lg:gap-5 lg:py-0 py-12">
          <div className="flex justify-start items-center w-80 gap-2">
            <p className="w-9 h-0.5 rounded-full bg-black"></p>
            <h2 className="uppercase">our bestsellers</h2>
          </div>
          <div className="w-80 ">
            <h1 className="font-prata-normal text-5xl font-light text-black/80">
              Latest Arrivals
            </h1>
          </div>
          <div className="flex justify-start items-center w-80 gap-2">
            <p className="w-9 h-0.5 rounded-full bg-black order-2"></p>
            <h2 className="uppercase order-1 font-medium">shop now</h2>
          </div>
        </div>
        <div className="flex-1 lg:order-1 order-2">
          <Image
            src={assets.hero_img}
            alt="hero"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;

import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Subcribe = () => {
  return (
    <div className="container m-auto md:px-0 px-4 my-16">
      <div className="w-full flex flex-col items-center text-center gap-5">
        <h1 className="text-xl font-bold text-black">
          Subscribe now & get 20% off
        </h1>
        <p className="text-gray-500">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
        <form className="md:w-[450px] w-full">
          <div className="w-full flex">
            <Input
              type="text"
              placeholder="Enter your mail"
              className="rounded-none"
            />
            <Button
              variant={"ghost"}
              className="uppercase rounded-none bg-foreground text-background cursor-pointer"
            >
              subscribe
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Subcribe;

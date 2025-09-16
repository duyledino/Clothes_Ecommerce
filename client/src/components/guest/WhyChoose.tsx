import React from "react";

const WhyChoose = () => {
  return (
    <div className="bg-white py-12 md:px-0 px-3">
      <div className="container mx-auto">
        <div className="flex justify-start items-center gap-4 w-full mb-14">
          <h2 className="text-xl uppercase font-semibold text-gray-500 rounded-full">
            Why <span className="text-black">choose US</span>
          </h2>
          <p className="w-9 h-0.5 rounded-full bg-black"></p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 border-2 gap-0.5 bg-gray-300">
          <div className="text-start p-12 py-24 bg-white">
            <h3 className="text-[14px] text-gray-900 font-bold mb-4">
              Quality Assurance:
            </h3>
            <p className="text-gray-700 text-[14px]">
              We meticulously select and vet each product to ensure it meets our
              stringent quality standards.
            </p>
          </div>
          <div className="text-start p-12 py-24 bg-white">
            <h3 className="text-[14px] text-gray-900 font-bold mb-4">
              Convenience:
            </h3>
            <p className="text-gray-700 text-[14px]">
              With our user-friendly interface and hassle-free ordering process,
              shopping has never been easier.
            </p>
          </div>
          <div className="text-start p-12 py-24 bg-white">
            <h3 className="text-[14px] text-gray-900 font-bold mb-4">
              Exceptional Customer Service:
            </h3>
            <p className="text-gray-700 text-[14px]">
              Our team of dedicated professionals is here to assist you the way,
              ensuring your satisfaction is our top priority.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;

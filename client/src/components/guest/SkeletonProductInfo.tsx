import React from "react";

const SkeletonProductInfo = () => {
  return (
    <div className="w-full flex md:flex-row flex-col md:px-0 px-3 gap-8 animate-pulse">
      <div className="flex-1 flex sm:flex-row flex-col-reverse items-center gap-3">
        <div className="flex sm:flex-col flex-row flex-wrap gap-3.5 w-auto">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="w-24 h-32 bg-gray-300 rounded-md"></div>
          ))}
        </div>
        <div className="md:w-md w-[320px]">
          <div className="w-full h-full aspect-auto bg-gray-300 rounded-md"></div>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-5">
        <div className="text-black font-bold text-xl bg-gray-300 h-8 w-48 rounded-md"></div>
        <div className="flex items-center gap-8">
          <div className="flex gap-2.5 items-center">
            {Array.from({ length: 5 }, (_, index) => (
              <div
                key={index}
                className="w-5 h-5 bg-gray-300 rounded-full"
              ></div>
            ))}
          </div>
          <p className="bg-gray-300 h-5 w-12 rounded-md"></p>
        </div>
        <div className="text-black font-bold text-2xl bg-gray-300 h-10 w-32 rounded-md"></div>
        <p className="text-gray-500 text-[14px] font-semibold bg-gray-300 h-6 w-64 rounded-md"></p>
        <div className="flex flex-col gap-3">
          <p className="bg-gray-300 h-5 w-24 rounded-md"></p>
          <div className="flex gap-3">
            {Array.from({ length: 4 }, (_, index) => (
              <div
                key={index}
                className="bg-gray-300 flex justify-center items-center text-foreground py-3 px-5 text-[16px] rounded-md w-16 h-12"
              ></div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p>Select size</p>
          {/* // TODO: add size and review product  */}
          <div className="flex gap-3">
            <div
              className={`bg-gray-300 flex justify-center items-center text-foreground py-3 px-5 text-[16px] transition-all cursor-pointer animate-pulse
                  `}
            ></div>
          </div>
        </div>
        <div className="bg-gray-300 h-12 w-48 rounded-md"></div>
        <div className="bg-gray-300 h-8 w-32 rounded-md"></div>
      </div>
    </div>
  );
};

export default SkeletonProductInfo;

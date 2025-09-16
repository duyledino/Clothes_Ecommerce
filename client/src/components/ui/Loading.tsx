import React from "react";

const Loading = () => {
  return (
    <div className="inset-0 fixed z-[99] flex justify-center items-center bg-black/90">
      <div className="flex justify-center items-center gap-2">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    </div>
  );
};

export default Loading;

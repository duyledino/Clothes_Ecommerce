import React, { useState } from "react";
import { Button } from "../ui/button";
import VirtualTryOn from "./VirtualTryOn";

const TryOnButton = ({ tryon }: { tryon: string }) => {
  const [click,setClick] = useState(false);
  return (
    <>
      <VirtualTryOn click={click} setClick={setClick} tryon={tryon}/>
      <Button
      onClick={()=>setClick(true)}
        variant={"ghost"}
        className="bg-gray-900 w-fit text-white hover:bg-transparent hover:text-gray-800 uppercase font-semibold py-6 px-8 rounded border-2 border-gray-900 cursor-pointer"
      >
        Virtual Tryon
      </Button>
    </>
  );
};

export default TryOnButton;

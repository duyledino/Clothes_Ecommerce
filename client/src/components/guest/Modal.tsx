import React, { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";

type ModalProps<T = any> = {
  content: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleClick: (param: T) => void;
  params: T;
};

const Modal = ({ open, setOpen, content, handleClick, params }: ModalProps) => {
  if (!open) return null;
  return (
    <div className="bg-black/80 fixed inset-0 z-50 flex justify-center items-center backdrop-blur-2xl">
      <div className="bg-white w-3xs flex flex-col justify-center items-center gap-5 p-12">
        <h1>{content || `Are you sure ?`}</h1>
        <div className="flex w-fit gap-8">
          <Button
            onClick={() => handleClick(params)}
            variant={"ghost"}
            className="hover:bg-gray-900 hover:text-white text-gray-800 font-semibold py-6 px-8 rounded bg-transparent border-2 border-gray-900 cursor-pointer"
          >
            Yes
          </Button>
          <Button
            variant={"ghost"}
            className="hover:bg-gray-900 hover:text-white text-gray-800 font-semibold py-6 px-8 rounded bg-transparent border-2 border-gray-900 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            Later
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

"use client";
import Image from "next/image";
import React, {
  InputHTMLAttributes,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { products } from "@/assets/frontend_assets/assets";
import { assets } from "@/assets/admin_assets/assets";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { motion } from "motion/react";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { tryAuth } from "@/schema/authTry";
import { fetchApiTryon, resetTryonState } from "@/slice/TryonSlice";

//later imageUrl will only be string not string[]
const VirtualTryOn = ({
  click,
  setClick,
  tryon,
}: {
  click: boolean;
  setClick: React.Dispatch<SetStateAction<boolean>>;
  tryon: string;
}) => {
  const dispatch = useAppDispatch();
  const { error, loading, url } = useAppSelector((state) => state.TryonSlice);
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      toast.error("No file selected.");
      return;
    }
    if (!files[0].type.includes("image/")) {
      toast.error("No image selected");
      return;
    }
    const imageUrl = URL.createObjectURL(files[0]);
    setImage(imageUrl);
    setFile(files[0]);
  };
  const handleClick = () => {
    const check = tryAuth.safeParse({ image, file });

    // go through zod check but typescript still needs check condition ??? weird !
    if (!check.success) {
      const issuse = check.error.issues[0];
      toast.error(issuse.message);
      return;
    }
    if (image === null || file === null) {
      toast.error("No file selected.");
      return;
    }
    console.log("imageProduct: ", image);
    console.log("photos: ", file);
    const formData = new FormData();
    formData.append("imageProduct", tryon);
    formData.append("photos", file);
    const localStore = localStorage.getItem("user");
    if (localStore === undefined || localStore === null) {
      toast.error("No token");
      return;
    }
    const token = JSON.parse(localStore).token;
    dispatch(fetchApiTryon({ formData: formData, token: token }));
  };
  useEffect(() => {
    if (!error && url !== null) {
      console.log(url);
      toast.success("Generate successfully");
    }
    if (error) {
      toast.error(error);
      resetTryonState();
    }
  }, [error]);
  if (!click) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/35 flex justify-center items-center backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col gap-3 w-3xl h-auto bg-white p-2.5"
        >
          <div className="w-full flex justify-end items-center">
            <X
              onClick={() => {
                setImage(null);
                setClick(false);
              }}
              className="cursor-pointer"
            />
          </div>
          <div className="flex-1 flex flex-col gap-3 w-full">
            <div className="flex gap-2.5 items-center justify-center">
              <Image width={220} height={210} src={assets.human} alt="temp" />
              <div>+</div>
              <Image width={220} height={210} src={assets.dress} alt="temp" />
              <div>=</div>
              <Image width={220} height={210} src={assets.tryon} alt="temp" />
            </div>
            <div className="flex gap-2.5 items-center">
              <div
                className={`relative
                `}
              >
                <Label htmlFor={`image1`}>
                  <Image
                    src={image !== null ? image : assets.upload_area}
                    alt="upload"
                    width={230}
                    height={220}
                    // width={width === undefined ? undefined : width >= 768 ? 96 : 80} // or whatever fits your layout
                  />
                  <Input
                    onChange={(e) => handleImageChange(e)}
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    id={`image1`}
                    hidden
                    className="absolute z-[9]"
                  />
                </Label>
              </div>
              <div>+</div>
              <Image src={tryon} width={230} height={220} alt="photo" />
              {/* <Image src={imageUrl[0]} width={230} height={220} alt="temp" /> */}
              <div>=</div>
              {/* // change to tryon later with same property if response is received from server*/}
              {loading ? (
                <>
                  <div className="relative h-[220px] w-[230px] flex justify-center items-center">
                    <div className="absolute z-[1] w-40 h-40 rounded-full animate-caret-blink blur-3xl bg-amber-100"></div>
                    <div className="relative w-full h-full bg-black/60 z-[2]">
                      <div className="absolute z-[3] top-0 left-0 w-full h-3 bg-white rounded-full scrollTopDown"></div>
                    </div>
                  </div>
                </>
              ) : (
                <Image
                  src={url !== null ? url : assets.question_mark}
                  width={230}
                  height={220}
                  alt="temp"
                />
              )}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Button
              onClick={() => handleClick()}
              variant={"ghost"}
              className="text-center bg-gray-900 w-fit text-white hover:bg-transparent hover:text-gray-800 uppercase font-semibold py-6 px-8 rounded border-2 border-gray-900 cursor-pointer"
            >
              Try Now
            </Button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default VirtualTryOn;

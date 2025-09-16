"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { assets } from "@/assets/admin_assets/assets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loading from "@/components/ui/Loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createProductSchema } from "@/schema/authProduct";
import { fetchCreateAProduct, resetStateProduct } from "@/slice/ProductSlice";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type ImageURL = {
  url: string;
  file: File;
};

const sizes: string[] = ["S", "M", "L", "XL", "XXL"];

function AddPage() {
  const dispatch = useAppDispatch();
  const { error, loading, Message } = useAppSelector(
    (state) => state.ProductSlice
  );
  // tryon url
  const [tryon, setTryon] = useState<ImageURL | null>(null);
  const [size, setSize] = useState<string[]>([]);
  const [category, setCategory] = useState<string>("");
  const [subCategory, setSubCategory] = useState<string>("");
  const [images, setImages] = useState<ImageURL[]>([]);
  const [price, setPrice] = useState<number>(0);
  //save file upload
  const [files, setFiles] = useState<File[]>([]);
  const [productName, setProductName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const handleClick = () => {
    if (price === undefined) {
      toast.error("Price can not leave");
      return;
    }
    if (tryon === null) {
      toast.error("Try on image is missing");
      return;
    }
    console.log("category,subCategory: ", category, subCategory);
    const check = createProductSchema.safeParse({
      category: category,
      subcategory: subCategory,
      images: files,
      productName: productName,
      description: description,
      price: price,
      size: size,
    });
    if (!check.success) {
      const firstIssue = check.error.issues[0];
      toast.error(firstIssue.message);
    } else {
      const localStore = localStorage.getItem("user");
      if (localStore === undefined || localStore === null) {
        toast.error("No token");
        return;
      }
      const token = JSON.parse(localStore).token;
      const formData = new FormData();
      files.forEach((item) => formData.append("photos", item));
      formData.append("title", productName);
      formData.append("description", description);
      formData.append("price", price?.toString());
      formData.append("category", category);
      formData.append("subcategory", subCategory);
      formData.append("size", JSON.stringify(size));
      formData.append("photos", tryon.file);
      dispatch(fetchCreateAProduct({ productCreate: formData, token }));
    }
  };
  const handleChangeImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      toast.error("No file selected");
      return;
    }
    if (!files[0].type.includes("image/")) {
      toast.error("No image selected");
      return;
    }
    console.log("file, index: ", files[0]);
    const imageURL = URL.createObjectURL(files[0]);
    setImages((prev) => [...prev, { url: imageURL, file: files[0] }]);
    setFiles((prev) => [...prev, files[0]]);
  };
  const handleChangeTryon = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      toast.error("No file selected");
      return;
    }
    if (!files[0].type.includes("image/")) {
      toast.error("No image selected");
      return;
    }
    console.log("file, index: ", files[0]);
    const imageURL = URL.createObjectURL(files[0]);
    setTryon((prev) => (prev = { url: imageURL, file: files[0] }));
  };
  // useEffect(() => {
  //   if (images !== undefined && images.length > 0) {
  //     setFiles((prev) => (prev = images.map((item) => item.file)));
  //   }
  // }, [images]);
  useEffect(() => {
    if (!error && Message) {
      console.log(Message);
      setFiles([]);
      setImages([]);
      setSize([]);
      setPrice(0);
      setProductName("");
      setDescription("");
      setCategory("");
      setSubCategory("");
      setTryon(null);
      dispatch(resetStateProduct());
      toast.success(Message);
    }
    if (error) {
      toast.error(error);
      dispatch(resetStateProduct());
    }
  }, [Message, error]);
  console.log(Message);
  useEffect(() => {
    console.log("files: ", files);
    console.log("image: ", images);
  }, [files]);
  const handleDelete = (url: string) => {
    const needDel = images.find((item) => item.url === url);
    if (url === "" || needDel === null) {
      toast.error("No image selected");
      return;
    }
    setImages((prev) => prev.filter((item) => item.url !== url));
    setFiles((prev) => prev.filter((item) => item !== needDel?.file));
  };
  const handleDeleteTryon = (url: string) => {
    if (tryon === null) {
      toast.error("No image selected");
      return;
    }
    setTryon(null);
  };
  return (
    <>
      {loading && <Loading />}
      <div className="flex flex-col">
        <div className="mb-3">
          <h1 className="mb-3 text-gray-900 text-[14px] font-semibold">
            Upload Image
          </h1>
          <div className="flex flex-row md:flex-nowrap flex-wrap md:justify-normal justify-around gap-3">
            {/* {Array.from({ length: 4 }, (v, i) => i).map((item, index) => (
              //use relative to handle layout fill of IMage
              
            ))} */}
            {images.length === 0
              ? ""
              : images.map((item, index) => (
                  <div
                    className={`relative md:w-24 md:h-24 w-20 h-20 hover:ring transition-all`}
                  >
                    <Label htmlFor={`image${index}`} key={index}>
                      <Image
                        src={item.url}
                        alt="upload"
                        layout="fill"
                        objectFit="cover"
                        // width={width === undefined ? undefined : width >= 768 ? 96 : 80} // or whatever fits your layout
                        className=""
                      />
                    </Label>
                    <div
                      onClick={() => handleDelete(item.url)}
                      className="cursor-pointer absolute w-4 h-4 -top-2 -right-2 flex justify-center z-10 items-center rounded-[50%] bg-red-400 text-white text-sm"
                    >
                      {<X />}
                    </div>
                  </div>
                ))}
            {files.length < 4 ? (
              <div
                className={`relative md:w-24 md:h-24 w-20 h-20 hover:ring transition-all`}
              >
                <Label htmlFor={`image`}>
                  <Image
                    src={assets.upload_area}
                    alt="upload"
                    layout="fill"
                    objectFit="cover"
                    // width={width === undefined ? undefined : width >= 768 ? 96 : 80} // or whatever fits your layout
                    className=""
                  />
                  <Input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    id={`image`}
                    hidden
                    onChange={(e) => handleChangeImages(e)}
                    className="absolute z-[9]"
                  />
                </Label>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="mb-3">
          <Label className="text-gray-900 mb-3">
            Try on Image (Store virtual try on)
          </Label>
          <div
            className={`relative md:w-24 md:h-24 w-20 h-20 hover:ring transition-all`}
          >
            {tryon !== null ? (
              <>
                <Image
                  src={tryon.url}
                  alt="upload"
                  layout="fill"
                  objectFit="cover"
                  // width={width === undefined ? undefined : width >= 768 ? 96 : 80} // or whatever fits your layout
                  className=""
                />
                <div
                  onClick={() => handleDeleteTryon(tryon.url)}
                  className="cursor-pointer absolute w-4 h-4 -top-2 -right-2 flex justify-center z-10 items-center rounded-[50%] bg-red-400 text-white text-sm"
                >
                  {<X />}
                </div>
              </>
            ) : (
              <Label htmlFor={`imageTryon`}>
                <Image
                  src={assets.upload_area}
                  alt="upload"
                  layout="fill"
                  objectFit="cover"
                  // width={width === undefined ? undefined : width >= 768 ? 96 : 80} // or whatever fits your layout
                  className=""
                />
                <Input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  id={`imageTryon`}
                  hidden
                  onChange={(e) => handleChangeTryon(e)}
                  className="absolute z-[9]"
                />
              </Label>
            )}
          </div>
        </div>
        <div className="mb-3">
          <Label htmlFor="productName" className="text-gray-900">
            Product name
          </Label>
          <Input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            type="text"
            id="productName"
            placeholder="Type here"
            className="mt-1"
          />
        </div>

        <div className="mb-3">
          <Label htmlFor="productDescription" className="text-gray-900">
            Product description
          </Label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="productDescription"
            placeholder="Write content here"
            className="mt-1 min-h-[100px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="mb-3 flex md:flex-row flex-col gap-4">
          <div>
            <Label htmlFor="productCategory" className="text-gray-900">
              Product category
            </Label>
            <Select
              onValueChange={(e) => {
                setCategory(e);
              }}
              value={category}
            >
              <SelectTrigger className="mt-1 w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="men">Men</SelectItem>
                <SelectItem value="women">Women</SelectItem>
                <SelectItem value="kids">Kids</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="productSubCategory" className="text-gray-900">
              Sub category
            </Label>
            <Select
              onValueChange={(e) => setSubCategory(e)}
              value={subCategory}
            >
              <SelectTrigger className="mt-1 w-[180px]">
                <SelectValue placeholder="Subcategory" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="topwear">Topwear</SelectItem>
                <SelectItem value="bottomwear">Bottomwear</SelectItem>
                <SelectItem value="shoes">Winterwear</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="productPrice" className="text-gray-900">
              Product Price
            </Label>
            <Input
              onChange={(e) => {
                if (isNaN(Number(e.target.value)))
                  toast.error("Price must be number");
                else setPrice(Number(e.target.value));
              }}
              value={price}
              type="text"
              id="productPrice"
              placeholder="25"
              className="mt-1 w-fit"
            />
          </div>
        </div>

        <div className="mb-3">
          <Label className="text-gray-900">Product Sizes</Label>
          <div className="flex gap-2 mt-1">
            {sizes.map((item, index) => (
              <button
                className={`${
                  size.find((i) => i === item) !== undefined
                    ? "bg-gray-900 text-gray-200"
                    : "bg-gray-200 text-gray-900"
                } w-10 h-10 cursor-pointer`}
                key={index}
                onClick={() => {
                  setSize((prev) => {
                    if (prev.find((i) => i === item) !== undefined)
                      return prev.filter((i) => i !== item);
                    return [...prev, item];
                  });
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <Button
          onClick={handleClick}
          variant={"ghost"}
          className="bg-gray-900 md:w-fit w-full text-white hover:bg-transparent hover:text-gray-800 uppercase font-semibold py-6 px-8 rounded border-2 border-gray-900 cursor-pointer"
        >
          ADD
        </Button>
      </div>
    </>
  );
};

export default AddPage;

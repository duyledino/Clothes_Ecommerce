import { PrismaClient } from "@prisma/client";
import { cloudinary } from "../../config/cloundinary.js";
import fs from "fs";
import { v4 as uuid } from "uuid";

const prisma = new PrismaClient();

const getAllProducts = async (req, res) => {
  const { page } = req.query;
  const { category, subcategory, sort } = req.body;
  console.log("category, subcategory, sort: ", category, subcategory, sort);
  const Category = category.map((item) => item.toLowerCase());
  const SubCategory = subcategory.map((item) => item.toLowerCase());
  const products = await prisma.product.findMany({
    select: {
      id: true,
      title: true,
      imageUrl: true,
      description: true,
      price: true,
      count: true,
      size: true,
      subCategory: true,
      category: true,
    },
    skip: 8 * (page - 1),
    take: 8,
    where: {
      isDelete: {
        equals: "",
      },
      AND: [
        Category.length > 0 ? { category: { in: Category } } : {},
        SubCategory.length > 0 ? { subCategory: { in: SubCategory } } : {},
      ],
    },
    orderBy:
      sort !== ""
        ? sort === "Low to High"
          ? {
              price: "asc",
            }
          : {
              price: "desc",
            }
        : {},
  });
  const fixBigIntProducts = products.map((item) => ({
    ...item,
    price: Number(item.price),
  }));
  return res.status(200).json({ products: fixBigIntProducts });
};

const getAllProductsAdmin = async (req, res) => {
  const { page } = req.query;
  console.log("page ", page);
  const products = await prisma.product.findMany({
    select: {
      id: true,
      title: true,
      imageUrl: true,
      price: true,
      size: true,
      subCategory: true,
      category: true,
      count: true,
      isDelete: true,
    },
    skip: 8 * (page - 1),
    take: 8,
    orderBy: {
      price: "desc",
    },
  });
  const fixBigIntProducts = products.map((item) => ({
    ...item,
    price: Number(item.price),
  }));
  return res.status(200).json({ products: fixBigIntProducts });
};

const getLastestProduct = async (req, res) => {
  const lastest = await prisma.product.findMany({
    select: {
      id: true,
      title: true,
      imageUrl: true,
      description: true,
      price: true,
    },
    take: 4,
    orderBy: {
      date: "desc",
    },
    where: {
      isDelete: {
        equals: "",
      },
    },
  });
  const fixBigIntLastest = lastest.map((item) => ({
    ...item,
    price: Number(item.price),
  }));
  return res.status(200).json({ products: fixBigIntLastest });
};
const getBestSeller = async (req, res) => {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      title: true,
      imageUrl: true,
      description: true,
      price: true,
    },
    take: 4,
    orderBy: {
      count: "desc",
    },
  });
  const fixBigIntProducts = products.map((item) => ({
    ...item,
    price: Number(item.price),
  }));
  return res.status(200).json({ products: fixBigIntProducts });
};
// model Product {
//     id          String   @id
//     title       String
//     price       BigInt // VND stored as whole numbers
//     description String
//     imageUrl    String[]
//     count       Int      @default(0)
//     date        DateTime @default(now())
//     detail      Detail[]
// }

const sortedSize = ["S", "M", "L", "XL", "XXL"];
const createAProduct = async (req, res) => {
  const files = req.files;
  // title: string
  // description: string
  // price: number
  // sudcategory, category: string
  // size: string[]
  const { title, description, price, category, subcategory, size } = req.body;
  console.log(
    "title, description,price,category,subcategory,tryon: ",
    title,
    description,
    price,
    category,
    subcategory
  );
  console.log("file: ", files);
  if (title === "" || description === "")
    return res.status(400).json({ Message: "Failed to create product" });
  if (!files || files.length === 0)
    return res.status(400).json({ Message: "Failed to create product" });
  const imageUrl = [];
  let tryonImg = null;
  for (let i = 0; i < files.length; i++) {
    const data = fs.readFileSync(files[i].path);
    const base64Image = `data:${files[i].mimetype};base64,${Buffer.from(
      data
    ).toString("base64")}`;
    const { secure_url } = await cloudinary.uploader.upload(base64Image);
    console.log("secure_url: ", secure_url);
    if (i === files.length - 1) tryonImg = secure_url;
    else imageUrl.push(secure_url);
    fs.unlinkSync(files[i].path);
  }
  const realSize = sortedSize.filter((item) => size.includes(item));
  console.log("realSize: ", realSize);
  console.log("imageUrl: ", imageUrl);
  await prisma.product.create({
    data: {
      id: `PDT-${uuid().slice(0, 8)}`,
      description,
      price: BigInt(price),
      title,
      imageUrl,
      tryon: tryonImg,
      category,
      subCategory: subcategory,
      size: realSize,
    },
  });
  return res.status(200).json({ Message: "Create product successfully" });
};

//cannot delete this because constraint to detail so mark it is deleted to delete it (not for sell anymore !!)
const deleteProduct = async (req, res) => {
  const { ids } = req.body;
  console.log("id delete array: ", ids);
  console.log("id delete array: ", typeof ids);
  if (!Array.isArray(ids)) {
    return res.status(400).json({ Message: "Failed to delete products" });
  }
  await prisma.product.updateMany({
    data: {
      isDelete: "deleted",
    },
    where: {
      id: {
        in: ids,
      },
    },
  });
  return res.status(200).json({ Message: "Delete product successfully" });
};

const reviseProduct = async (req, res) => {
  const { ids } = req.body;
  console.log("id delete array: ", ids);
  console.log("id delete array: ", typeof ids);
  if (!Array.isArray(ids)) {
    return res.status(400).json({ Message: "Failed to delete products" });
  }
  await prisma.product.updateMany({
    data: {
      isDelete: "",
    },
    where: {
      id: {
        in: ids,
      },
    },
  });
  return res.status(200).json({ Message: "Revise product successfully" });
};

const findProduct = async (req, res) => {
  const { query } = req.query;
  const result = await prisma.product.findMany({
    select: {
      id: true,
      title: true,
      imageUrl: true,
      description: true,
      price: true,
      count: true,
      size: true,
      subCategory: true,
      category: true,
    },
    where: {
      title: {
        startsWith: `${query.toLowerCase()}`,
      },
    },
  });
  const fixBigIntProducts = result.map((item) => ({
    ...item,
    price: Number(item.price),
  }));
  return res.status(200).json({ result: fixBigIntProducts });
};

const getProductById = async (req, res) => {
  const { id } = req.query;
  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      title: true,
      imageUrl: true,
      description: true,
      price: true,
      size: true,
      tryon: true,
    },
  });
  const fixBigIntProduct = {
    ...product,
    price: Number(product.price),
  };
  return res.status(200).json({ product: fixBigIntProduct });
};

const getTotalPage = async (req, res) => {
  const { category, subcategory } = req.body;
  console.log("category,subcategory: ", category, subcategory);
  const Category = category.map((item) => item.toLowerCase());
  const SubCategory = subcategory.map((item) => item.toLowerCase());
  const products = await prisma.product.findMany({
    select: {
      id: true,
    },
    where: {
      AND: [
        Category.length > 0 ? { category: { in: Category } } : {},
        SubCategory.length > 0 ? { subCategory: { in: SubCategory } } : {},
      ],
    },
  });
  const total = products.length;
  console.log("total: ", total);
  return res.status(200).json({ total: Number(Math.ceil(Number(total) / 8)) });
};

export {
  getTotalPage,
  findProduct,
  getAllProducts,
  deleteProduct,
  getBestSeller,
  getLastestProduct,
  createAProduct,
  getProductById,
  getAllProductsAdmin,
  reviseProduct
};

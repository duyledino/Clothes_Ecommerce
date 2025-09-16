import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getCart = async (req, res) => {
  // get user id
  const { id } = req.query;
  const exists = await prisma.user.findFirst({
    where: {
      id,
    },
  });
  if (!exists) return res.status(404).json({ Message: "User not found" });
  const carts = await prisma.cart.findMany({
    select: {
      count: true,
      product: {
        select: {
          id: true,
          price: true,
          imageUrl: true,
          title: true,
        },
      },
      active: true,
      subtotal: true,
      size: true,
    },
    where: {
      userId: id,
    },
  });
  const fixBigIntCart = carts.map((item) => ({
    ...item,
    subtotal: Number(item.subtotal),
    product: { ...item.product, price: Number(item.product.price) },
  }));
  return res.status(200).json({ carts: fixBigIntCart });
};
const addToCart = async (req, res) => {
  // get user id and 1 add from client
  // if exists will update "count" else add new row
  const { id } = req.query;
  //     cartItem:  {
  // product product
  // count     Int     @default(0)
  // subtotal  BigInt  @default(0)
  //active @default(false)
  //     }
  const { cartItem } = req.body;
  console.log("add to cart: ", cartItem);
  const exists = await prisma.user.findFirst({
    where: {
      id,
    },
  });
  if (!exists) return res.status(404).json({ Message: "User not found" });
  // get exists item in relation cart
  const existsItem = await prisma.cart.findFirst({
    where: {
      userId: id,
      productId: cartItem.product.id,
      size: cartItem.size,
    },
  });
  if (!existsItem) {
    await prisma.cart.create({
      data: {
        count: cartItem.count,
        subtotal: cartItem.subtotal,
        userId: exists.id,
        productId: cartItem.product.id,
        active: cartItem.active,
        size: cartItem.size,
      },
    });
  } else {
    await prisma.cart.update({
      data: {
        count: cartItem.count,
        subtotal: cartItem.subtotal,
        active: cartItem.active,
      },
      where: {
        userId_productId_size: {
          userId: exists.id,
          productId: cartItem.product.id,
          size: cartItem.size,
        },
      },
    });
  }
  return res.status(200).json({ Message: "update cart successfully" });
};
// this route will clear all item in cart
const clearCart = async (req, res) => {
  // get user id
  const { id } = req.query;
  const exists = await prisma.user.findFirst({
    where: {
      id,
    },
  });
  if (!exists) return res.status(404).json({ Message: "User not found" });
  await prisma.cart.deleteMany({
    where: {
      userId: id,
    },
  });
  return res.status(200).json({ Message: "Cart is cleared" });
};
// this route will remove an item in cart
const removeAnItem = async (req, res) => {
  // get user id and get product id
  const { userId, productId, size } = req.query;
  const exists = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
  if (!exists) return res.status(404).json({ Message: "User not found" });
  await prisma.cart.delete({
    where: {
      userId_productId_size: {
        productId,
        userId,
        size,
      },
    },
  });
  return res.status(200).json({ Message: "Item is removed" });
};

export { addToCart, clearCart, getCart, removeAnItem };

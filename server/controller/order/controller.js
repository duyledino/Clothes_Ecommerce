import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllOrder = async (req, res) => {
  const { page } = req.query;
  const orders = await prisma.order.findMany({
    select: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
      details: {
        select: {
          product: {
            select: {
              title: true,
            },
          },
          size: true,
          count: true,
        },
      },
      id: true,
      status: true,
      total: true,
      payment: true,
      update: true,
    },
    take: Number(page) * 8,
  });
  const fixBigInt = orders.map((item) => ({
    ...item,
    total: Number(item.total),
  }));
  return res.status(200).json({ orders: fixBigInt });
};
// client will send array of detail then server will create each detail in array then create a order
// details: [
//   {
//     productId,
//     count,
//     subTotal,
//      size
//   },
// ];
const createAOrder = async (req, res) => {
  //get user id and details[]
  const { userId, details } = req.body;
  console.log("userId, details: ", userId, details);
  const total = details.reduce((pre, curr) => pre + curr.subTotal, 0);
  const existsUser = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
  if (!existsUser || existsUser.address === '')
    return res.status(400).json({ Message: "Failed to Purchase" });
  if (!Array.isArray(details) || details.length <= 0)
    return res.status(400).json({ Message: "Failed to Purchase" });
  const orderCreated = await prisma.order.create({
    data: {
      userId,
      total,
    },
  });
  const detail = details.map((item) => ({
    orderId: orderCreated.id,
    productId: item.productId,
    count: item.count,
    subtotal: BigInt(item.subTotal),
    size: item.size,
  }));
  await prisma.detail.createMany({
    data: detail,
  });
  for (let i = 0; i < detail.length; i++) {
    await prisma.$queryRaw`update "Product" set count=count + ${detail[i].count} where id = ${detail[i].productId}`;
  }
  await prisma.cart.deleteMany({
    where: {
      userId: userId,
      active: true,
    },
  });
  return res
    .status(200)
    .json({ Message: "Create order successfully", orderId: orderCreated.id });
};

// {
//     id
//     status,
//     payment
// }
// order's payemnt can be edit by admin or user's payement
// this controller aims to update payment status and order status
const updateAOrder = async (req, res) => {
  // get order id and payment: string, status: string
  let { payment, status } = req.body;
  const { id } = req.query;
  payment = payment === "" ? "pending" : payment;
  status = status === "" ? "Order Placed" : status;
  const exist = await prisma.order.findFirst({
    where: {
      id,
    },
  });
  console.log("id: ", id);
  console.log("exists: ", exist);
  if (!exist) return res.status(400).json({ Message: "Failed to upate order" });
  await prisma.order.update({
    data: {
      payment,
      status,
    },
    where: {
      id,
    },
  });
  return res.status(200).json({ Message: "Update order successfully" });
};

const getTotalPage = async (req, res) => {
  const orders = await prisma.product.findMany({
    select: {
      id: true,
    },
  });
  const total = orders.length;
  console.log("total: ", total);
  //get 8 order per page
  return res.status(200).json({ total: Number(Math.ceil(Number(total) / 8)) });
};

const getOrdersById = async (req, res) => {
  //get user id
  const { id } = req.query;
  console.log("id: ", id);
  // Sample:
  // id="456"
  //           userId="123"
  //           total={100}
  //           date="2023-10-26"
  //           status="Shipped"
  //           payment="Done"
  //           details={[{ productId: "789", count: 1, subtotal: 100 }]}
  const orders = await prisma.order.findMany({
    select: {
      id: true,
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          address: true,
        },
      },
      details: {
        select: {
          count: true,
          productId: true,
          subtotal: true,
          size: true,
        },
      },
      total: true,
      status: true,
      payment: true,
      update: true,
    },
    where: {
      userId: id,
    },
  });
  const fixBigIntDetail = orders.map((item) => ({
    ...item,
    details: item.details.map((child) => ({
      ...child,
      subtotal: Number(child.subtotal),
    })),
  }));
  const fixBigInt = fixBigIntDetail.map((item) => ({
    ...item,
    total: Number(item.total),
  }));
  return res.status(200).json({ orders: fixBigInt });
};

export { createAOrder, updateAOrder, getAllOrder, getTotalPage, getOrdersById };

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getRevenue = async (req, res) => {
  const getTotal = await prisma.$queryRaw`SELECT 
  EXTRACT(MONTH FROM update) AS month,
  EXTRACT(YEAR FROM update) AS year,
  SUM(total) AS total
FROM "Order"
WHERE payment = 'Done'
GROUP BY month, year
ORDER BY year DESC, month DESC
LIMIT 3;
`;
  const fixGetTotal = getTotal.map((row) => ({
    month: row.month, //number
    year: row.year, ////number
    total: Number(row.total),
  }));
  return res.status(200).json({
    revenue: fixGetTotal,
  });
};

const bestSeller = async (req, res) => {
  const best = await prisma.product.findMany({
    select: {
      id: true,
      price: true, // number
      count: true, //number
      title: true, //string
    },
    orderBy: {
      count: "desc",
    },
    // ensure column count > 0
    where: {
      count: {
        gt: 0,
      },
    },
    take: 3,
  });
  const fixGetPrice = best.map((row) => ({
    id: row.id,
    price: Number(row.price),
    count: Number(row.count),
    title: row.title,
  }));
  return res.status(200).json({ bestSeller: fixGetPrice });
};

const bestCustomer = async (req, res) => {
  const getTotal =
    await prisma.$queryRaw`select o.id,u."name",u.email,sum(o.total) as total
from "Order" o join "User" u on o."userId" = u.id 
where o.payment = 'Done'
group by o.id,u."name",u.email
order by total desc
limit 3
`;
  const fixGetTotal = getTotal.map((row) => ({
    id: row.id, //string
    name: row.name,
    email: row.email,
    total: Number(row.total), //number
  }));
  return res.status(200).json({ bestCustomer: fixGetTotal });
};

export { getRevenue, bestSeller, bestCustomer };

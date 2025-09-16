import { PrismaClient } from "@prisma/client";
import { genSalt, hash, compare } from "bcrypt";
import { createToken } from "../../middleware/authentication.js";

const prisma = new PrismaClient();

const getAllUser = async (req, res) => {
  const { page } = req.query;
  const users = await prisma.user.findMany({
    take: Number(page) * 10,
  });
  return res.status(200).json({ users: users });
};

const getAUser = async (req, res) => {
  //get user id
  const { id } = req.query;
  const exists = await prisma.user.findFirst({
    select: {
      email: true,
      name: true,
      address: true,
      id: true,
    },
    where: {
      id: id,
    },
  });
  if (!exists) return res.status(400).json({ Message: "User not found" });
  return res.status(200).json({ user: exists });
};

//client will check empty;
const createAUser = async (req, res) => {
  const { email, password, name } = req.body;
  const exists = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  const hasUser = !!(await prisma.user.findFirst({ select: { id: true } }));
  if (exists) return res.status(400).json({ Message: "User already exists" });
  const salt = await genSalt(5);
  const hashPass = await hash(password, salt);
  let user;

  user = await prisma.user.create({
    data: {
      email: email,
      password: hashPass,
      name,
      admin: !hasUser,
    },
  });

  const token = createToken({
    id: user.id,
    email,
    name: name === "" || name === undefined ? "" : name,
    admin: user.admin,
  });
  return res.status(200).json({
    Message: "Create user successfully",
    token,
    id: user.id,
    email: user.email,
    admin: user.admin,
  });
};

const updateUser = async (req, res) => {
  const { id, address, name, password } = req.body;
  const exists = await prisma.user.findFirst({
    where: {
      id,
    },
  });
  let updated;
  if (!exists) return res.status(400).json({ Message: "User not found" });
  if (password === "") {
    updated = await prisma.user.update({
      data: {
        address,
        name,
      },
      where: {
        id,
      },
    });
  } else {
    const salt = await genSalt(5);
    const hashPass = await hash(password, salt);
    updated = await prisma.user.update({
      data: {
        name: name,
        password: hashPass,
        address: address,
      },
      where: {
        id,
      },
    });
  }
  console.log("updated: ", updated);
  return res.status(200).json({ Message: "Update successfully" });
};

const deleteUser = async (req, res) => {
  const { id } = req.query;
  const exists = await prisma.user.findFirst({
    where: {
      id,
    },
  });
  if (!exists) return res.status(400).json({ Message: "User not found" });
  await prisma.user.delete({
    where: {
      id,
    },
  });
  return res.status(200).json({ Message: "Delete successfully" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // gmail, password will validate on client;
  const exists = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (!exists)
    return res.status(400).json({ Message: "Wrong email or password" });
  const verify = await compare(password, exists.password);
  if (!verify)
    return res.status(400).json({ Message: "Wrong email or password" });
  const token = createToken({
    id: exists.id,
    email,
    name: exists.name,
    admin: exists.admin,
  });
  //Client will save token and admin (boolean) to localStorage
  return res.status(200).json({
    Message: "Login successfully",
    token,
    admin: exists.admin,
    email: exists.email,
    id: exists.id,
  });
};

export { createAUser, deleteUser, updateUser, getAllUser, loginUser, getAUser };

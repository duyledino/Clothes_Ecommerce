import jwt from "jsonwebtoken";
import "dotenv/config";

const createToken = (payload) => {
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "7d",
    algorithm: "HS256",
  });
  return token;
};

const authenticateUser = (req, res, next) => {
  // console.log("req.headers: ",req.headers); NOTE: log to debug authorization
  if (!req.headers || !req.headers.authorization)
    return res.status(400).json({ Message: `No token` });
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decode = jwt.decode(token, process.env.SECRET_KEY);
    if (!decode)
      return res.status(400).json({ Message: `Wrong token or token expires` });
    req.user = decode;
    next();
  } catch (error) {
    return res.status(400).json({ Message: `Wrong token or token expires` });
  }
};

const authenticateAdmin = (req, res, next) => {
  if (!req)
    return res.status(400).json({ Message: `Wrong token or token expires` });
  console.log("req.user: ",req.user);
  const isAdmin = req.user.admin;

  //check isAdmin is true or false
  if (!isAdmin) return res.status(400).json({ Message: `Unauthenticate` });
  next();
};

export { createToken, authenticateUser,authenticateAdmin };

import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv();

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Token missing" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
    console.log("Token decoded:", user);
  });
}

export default authenticate;

import express from "express";
import connectDatabase from "./src/database/database.js";
import dotenv from "dotenv";

import userRoute from "./src/routes/user.route.js";
import authRoute from "./src/routes/auth.routes.js";
import newsRoute from "./src/routes/news.route.js";

dotenv.config();

function checktoken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "acesso negado!" });
  }
  try {
    const secret = process.env.SECRET;
    jwt.verify(token, secret);
    next();
  } catch (error) {
    res.status(400).json({ msg: "token invalido" });
  }
}

const port = process.env.PORT || 3000;
const app = express();

connectDatabase();
app.use(express.json()); //transforma o post em json
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/news", newsRoute);

app.listen(port, () => console.log(`Servidor rodando porta ${port}`));

// app.get("/", (req, res) => {
//   res.status(200).json();
// });
//final
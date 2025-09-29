import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/index";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "https://vmetke.ru";

app.use(cors({
  origin: [FRONTEND_ORIGIN, "https://www.vmetke.ru"],
  credentials: true
}));
app.use(express.json());

app.use("/api", routes);

app.listen(PORT, () => console.log(`Server on port ${PORT}`));

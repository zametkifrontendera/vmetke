import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/index";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "https://vmetke.ru" }));
app.use(express.json());

app.use("/api", routes);

app.listen(PORT, () => console.log(`Server on port ${PORT}`));

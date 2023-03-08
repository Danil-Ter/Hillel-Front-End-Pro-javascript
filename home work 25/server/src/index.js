import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();
const port = 3000;

app.use(cors());
app.use("/api/products", routes.products);

app.listen(port, () => {
  console.log(`Start listening on ${port} port`);
});

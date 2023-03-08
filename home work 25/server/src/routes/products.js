import { Router } from "express";
import db from "./../database/index.js";

const router = Router();

router
  .get("/", function (req, res) {
    let products = db.data.products;

    res.status(200).json({
      statusText: "success",
      data: products,
    });
  })
  .get("/:id", function (req, res) {
    const { id } = req.params;
    let products = db.data.products;
    let foundProduct = products.find((product) => product.id === +id);

    if (foundProduct) {
      return res.status(200).json({
        statusText: "success",
        data: foundProduct,
      });
    }

    res.status(404).json({
      statusText: "feiled",
      message: `Product with ${id} ID is not found`,
    });
  })
  .delete("/:id", function (req, res) {
    const { id } = req.params;
    let products = db.data.products;
    let foundIndex = products.findIndex((product) => product.id === +id);

    if (foundIndex !== -1) {
      products.splice(foundIndex, 1);
      return res.status(200).json({
        statusText: "success",
        message: `Product with ID ${id} is deleted`,
      });
    }

    res.status(404).json({
      statusText: "failed",
      message: `Product with ID ${id} is not found`,
    });
  });

export default router;
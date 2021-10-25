import Product from "../models/Product.js";
import { Request, Response } from "express";

const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({});
    res.json(products);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export {
  getProducts,
  getProductById,
};

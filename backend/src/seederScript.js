import { config } from "dotenv";
import productData from "./data/products";
import connectDB from "./config/db";
import { deleteMany, insertMany } from "./models/Product";

config();

connectDB();

const importData = async () => {
  try {
    await deleteMany({});

    await insertMany(productData);

    console.log("Data Import Success");

    process.exit();
  } catch (error) {
    console.error("Error with data import", error);
    process.exit(1);
  }
};

importData();

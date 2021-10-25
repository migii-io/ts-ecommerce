var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { config } from "dotenv";
import productData from "./data/products.js";
import connectDB from "./config/db.js";
import Product from "./models/Product.js";
config();
connectDB();
const importData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Product.deleteMany({});
        yield Product.insertMany(productData);
        console.log("Data Import Success");
        process.exit();
    }
    catch (error) {
        console.error("Error with data import", error);
        process.exit(1);
    }
});
importData();

import { Router } from "express";
import EnsureAuthentication from "../Middlewares/Auth.middleware.js";

const ProductRouter = Router();

ProductRouter.get('/',EnsureAuthentication,(req,res)=>{
  console.log("-------------User is authenticated",req.user);
  res.status(200).json([
   {
    name: "Mobile",
    price: 104500,
  },
  {
    name: "Laptop",
    price: 75000,
  },
  {
    name: "Tablet",
    price: 50000,
  },
  {
    name: "Smart Watch",
    price: 25000,
  },
  {
    name: "Headphones",
    price: 8500,
  },
  {
    name: "Bluetooth Speaker",
    price: 12000,
  },
  {
    name: "Camera",
    price: 65000,
  },
  {
    name: "Monitor",
    price: 30000,
  },
  {
    name: "Keyboard",
    price: 4500,
  },
  {
    name: "Mouse",
    price: 2500,
  },
  {
    name: "Printer",
    price: 18000,
  },
  {
    name: "Gaming Console",
    price: 40000,
  },
  {
    name: "VR Headset",
    price: 60000,
  },
  {
    name: "External Hard Drive",
    price: 10000,
  },
  {
    name: "Router",
    price: 7000,
  },
  ]);
})
export default ProductRouter;

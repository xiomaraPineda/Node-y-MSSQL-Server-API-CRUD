import { Router } from "express";
const router = Router();
import { getproducts, getProduct, createProduct, updateProduct, deleteProduct} from '../controllers/products.controllers.js'

router.get("/productos", getproducts);

router.get("/productos/:id", getProduct);

router.post("/productos", createProduct);

router.put("/productos/:id", updateProduct);

router.delete("/productos/:id", deleteProduct);


export default router;
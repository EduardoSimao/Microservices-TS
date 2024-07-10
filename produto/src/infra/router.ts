import { request, response, Router } from "express";
import { CreateProductController } from "../modules/create-product/create-product.controller";

const router = Router();

router.post("/product", (request, response) => {
    new CreateProductController().handle(request, response)
})

export {router}
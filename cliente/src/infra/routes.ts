import { request, response, Router } from "express";
import { CreateClientUseCase } from "../modules/create-client/create-client.usecase";
import { CreateClientController } from "../modules/create-client/create-client.controller";

const router = Router();

router.post("/client", (request, response) => {
    new CreateClientController().handle(request, response)
})

export {router}
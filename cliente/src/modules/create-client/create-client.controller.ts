import { Request, Response } from "express";
import { CreateClientUseCase } from "./create-client.usecase";

export class CreateClientController {

    constructor(){}

    async handle(request: Request, response: Response){
        const useCase = new CreateClientUseCase();

        try {
            const result = await useCase.execute(request.body);
            return response.json(result)
            //return response.status(201).send()
        }catch (err){
            return response.status(400).json(err)
        }
    }
}
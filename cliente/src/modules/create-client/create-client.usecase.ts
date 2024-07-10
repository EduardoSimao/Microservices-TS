import { prismaClient } from "../../infra/database/prismaClient"
import { kafka } from "../../infra/provider/kafka"
import { kafkaSendMessage } from "../../infra/provider/kafka/producer"

type CreateClientRequest = {
    name: string
    password: string
    email: string
    phone: string

}

export class CreateClientUseCase {
    constructor(){}

    async execute(data: CreateClientRequest){
        
        const customer = await prismaClient.client.findFirst({
            where: {
                email: data.email
            }
        })

        if (customer) throw new Error('Customer alredy exist!')

        const clientCreated = await prismaClient.client.create({
            data:{
                ...data
            }
        })

        const kafkaProducer = new kafkaSendMessage();
        await kafkaProducer.execute('Created_Client', {
            id: clientCreated.id,
            email: clientCreated.email
        })
        return clientCreated
    }
}

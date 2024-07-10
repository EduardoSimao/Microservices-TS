import { prismaclient } from "../../infra/database/prismaClient"
import { kafkaSendMessage } from "../../infra/providers/kafka/producer"

type CreateProductRequest = {
    name: string
    code: string
    quantity: number
    price: number

}

export class CreateProductUseCase {
    constructor(){}

    async execute (data: CreateProductRequest) {
        const product = await prismaclient.product.findFirst({
            where: {
                code: data.code
            }
        })

        if(product) throw new Error("Product alredy exists!")
        
        const productCreated = await prismaclient.product.create({
            data: {
                ...data
            }
        })

        const kafkaProducer = new kafkaSendMessage();
        await kafkaProducer.execute('Created_Product', {
            id: productCreated.id,
            code: productCreated.code
        })

        return productCreated
    }
}
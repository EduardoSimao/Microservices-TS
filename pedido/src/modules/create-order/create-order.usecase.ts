import { prismaclient } from "../../infra/database/prismaClient"

type CreateOrderRequest = {
    clientId: string
    items: [{
        productId: string;
        quantity: number
    }]
}

export class CreateOrderUseCase {
    constructor(){}

    async execute (data: CreateOrderRequest) {
        const order = await prismaclient.order.create({
            data: {
                clientId: data.clientId,
                status: "Aguardando_Pagamento",
                OrderItems: {
                    createMany: {
                        data: data.items
                    }
                }
            }
        })

        return order

    }
}
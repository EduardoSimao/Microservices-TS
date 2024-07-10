import { prismaclient } from "../../infra/database/prismaClient"

type UpdateOrderRequest = {
    id: string,
    status: string
}

export class CreateOrderUseCase {
    constructor(){}

    async execute (data: UpdateOrderRequest) {
        const orderpdate = await prismaclient.order.update({
            where: {
                id: data.id
            },
            data: {
                status: "Pagamento_Realizado"
            }
        })

        

    }
}
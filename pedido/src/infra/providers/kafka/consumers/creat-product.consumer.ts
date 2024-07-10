import { prismaclient } from "../../../database/prismaClient";
import { kafkaConsumer } from "../kafka.consumer";

type ProducConsumer = {
    code: string,
    id: string
}
export async function createProductConsumer() {
    console.log('Product Consumer')
    const consumer = await kafkaConsumer("Created_Product");
    await consumer.run({
        eachMessage: async ({ message }) => {
            const messageToString = message.value!.toString()
            const product = JSON.parse(messageToString) as ProducConsumer

            await prismaclient.product.create({
                data: {
                    externalID: product.id,
                    code: product.code
                }
            })
        }
    })
    
}


createProductConsumer()
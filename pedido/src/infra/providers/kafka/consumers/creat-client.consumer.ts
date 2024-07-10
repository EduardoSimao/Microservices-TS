import { prismaclient } from "../../../database/prismaClient";
import { kafkaConsumer } from "../kafka.consumer";

type ClientConsumer = {
    email: string,
    id: string
}
export async function createCustomerConsumer() {
    console.log('Customer Consumer')
    const consumer = await kafkaConsumer("Created_Client");
    await consumer.run({
        eachMessage: async ({ message }) => {
            const messageToString = message.value!.toString()
            const client = JSON.parse(messageToString) as ClientConsumer

            await prismaclient.client.create({
                data: {
                    externalID: client.id,
                    email: client.email
                }
            })
        }
    })
    
}


createCustomerConsumer()
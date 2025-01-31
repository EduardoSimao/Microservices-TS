import { kafka } from "."

export class kafkaSendMessage{
    async execute(topic: string, payload: any): Promise <void>{
        const producer = kafka.producer()

        await producer.connect();
        console.log(`Message sent to Topic ${topic}`)
        await producer.send({
            topic,
            messages:[
                {value: JSON.stringify(payload)}
            ]
        })

        await producer.disconnect();
    }
}
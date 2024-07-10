import { Kafka } from "kafkajs";

const kafka = new Kafka({
    brokers: ['brave-snipe-8969-us1-kafka.upstash.io:9092'],
    ssl: true,
    sasl: {
        mechanism: 'scram-sha-256',
        username: 'YnJhdmUtc25pcGUtODk2OSQxd7fEZFb0YlPujjuwWZRCjj02MgCDXim_msXWbRk',
        password: 'NDg5ZmU5MjktMGE1Yi00MjdlLWJiMWQtZGZkNGNhZGMxNDEy'
    },
})

export {kafka}

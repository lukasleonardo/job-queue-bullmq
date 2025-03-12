const Queue = require('bullmq').Queue
const redisConfig = require("../config/redis.js");

 const emailQueue = new Queue("emailQueue", {
    connection: redisConfig,
    defaultJobOptions: {
        removeOnComplete: {
            age: 60 * 15 // Remover após 1 dia
        },
        removeOnFail: {
            age: 60 * 30 // Remover após 1 dia se falhar
        }
    }
});

module.exports = emailQueue
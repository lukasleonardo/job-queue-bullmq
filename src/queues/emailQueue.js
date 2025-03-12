const Queue = require('bullmq').Queue
const redisConfig = require("../config/redis.js");

 const emailQueue = new Queue("emailQueue", {
    connection: redisConfig,
});

module.exports = emailQueue
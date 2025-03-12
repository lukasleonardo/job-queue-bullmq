const Redis = require("ioredis");

const redisClient = new Redis(process.env.REDIS_URL+ '?family=0', {
    tls: { rejectUnauthorized: false },
    maxRetriesPerRequest: null,
});

redisClient.on("connect", () => console.log("✅ Conectado ao Redis no Railway!"));
redisClient.on("error", (err) => console.error("❌ Erro no Redis:", err));

module.exports = redisClient;

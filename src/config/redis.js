const Redis = require("ioredis");

const redisClient = new Redis(process.env.REDIS_URL, {
    tls: { rejectUnauthorized: false } // Se precisar de conexão segura
});

redisClient.on("connect", () => console.log("✅ Conectado ao Redis no Railway!"));
redisClient.on("error", (err) => console.error("❌ Erro no Redis:", err));

module.exports = redisClient;

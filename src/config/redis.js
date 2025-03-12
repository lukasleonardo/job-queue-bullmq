const { createClient } = require("redis");

const redisClient = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379" 
});

redisClient.on("error", (err) => console.error("Erro no Redis", err));

(async () => {
    await redisClient.connect();
    console.log("🔗 Conectado ao Redis!");
})();

module.exports = redisClient;

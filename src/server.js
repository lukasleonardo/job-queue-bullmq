const express = require('express')
const emailQueue = require('./queues/emailQueue.js')
const { createBullBoard } = require("@bull-board/api");
const { BullMQAdapter } = require("@bull-board/api/bullMQAdapter");
const { ExpressAdapter } = require("@bull-board/express");
require("./queues/emailProcessor.js");
const logger = require('./config/logger.js')

const app = express();
app.use(express.json());
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

createBullBoard({
    queues:[new BullMQAdapter(emailQueue)],
    serverAdapter

});
app.use("/admin/queues", serverAdapter.getRouter());

app.post("/send-email", async (req, res) => {
    try{
        const { to, subject, body } = req.body;
        const job = await emailQueue.add("send_email", { to, subject, body });
        logger.info(`Job de envio de e-mail adicionado à fila: ${job.id}`)
        res.json({ message: "Email Enviado para fila" });
    }catch(error){
        logger.error(`Falha ao enviar e-mail para: ${req.body.to}, Erro: ${error.message}`);
        res.status(500).json({ message: "Falha ao adicionar o e-mail na fila" });
    }
});



app.listen(3000, () => {
    console.log("🚀 Server started on http://localhost:3000");
});
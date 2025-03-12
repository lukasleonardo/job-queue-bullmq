const express = require('express')
const emailQueue = require('./queues/emailQueue.js')
const { createBullBoard } = require("@bull-board/api");
const { BullMQAdapter } = require("@bull-board/api/bullMQAdapter");
const { ExpressAdapter } = require("@bull-board/express");
require("./queues/emailProcessor.js");

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
    const { to, subject, body } = req.body;
    await emailQueue.add("send_email", { to, subject, body });
    res.json({ message: "Email Enviado para fila" });
});



app.listen(3000, () => {
    console.log("🚀 Server started on http://localhost:3000");
});
const Worker = require('bullmq').Worker
const redisConfig = require("../config/redis.js");
const { sendEmail } = require("../services/emailService.js");


const emailWorker = new Worker("emailQueue", async (job) => {
    console.log(`📩 Processando envio de Email para job id: ${job.id}...  destinatário ${job.data.to}`);
    await sendEmail(job.data.to, job.data.subject, job.data.body);
    console.log(`✅ Email Enviado para ${job.data.to}`);
},
{
    connection: redisConfig,
});

emailWorker.on("failed", (job,err) => {
    console.log(`❌ Job ${job.id} falhou: ${err.message}`);
});

emailWorker.on("completed", (job) => {
    console.log(`✅ Job ${job.id} concluído`);
    setTimeout(async () => {
        await job.remove();
        console.log(`Job ${job.id} removido.`);
    }, 10000);
});

emailWorker.on("progress", (job) => {
    console.log(`📩 Job ${job.id} processando...`)
    setTimeout(async () => {  
    }, 10000);
    console.log(`📩 Job ${job.id} processado...`)    
});
const Worker = require('bullmq').Worker
const redisConfig = require("../config/redis.js");
const { sendEmail } = require("../services/emailService.js");
const logger = require('../config/logger.js')

const emailWorker = new Worker("emailQueue", async (job) => {
    try{
        logger.info(`📩 Processando job de envio de e-mail: ${job.id}`);
        console.log(`📩 Processando envio de Email para job id: ${job.id}...  destinatário ${job.data.to}`);
        await sendEmail(job.data.to, job.data.subject, job.data.body);
        console.log(`✅ Email Enviado para ${job.data.to}`);
        logger.info(`✅ Job de envio de e-mail ${job.id} concluído com sucesso`);
    }catch(error){
        logger.error(`❌ Falha no job ${job.id}, Erro: ${error.message}`);
    }
},
{
    connection: redisConfig,
});

emailWorker.on("progress", (job) => {
    logger.info(`📩 Job ${job.id} Processando...`);
    console.log(`📩 Job ${job.id} processando...`)
    setTimeout(async () => {  
    }, 10000);
    console.log(`📩 Job ${job.id} processado...`)    
});

emailWorker.on("completed",async(job) => {
    logger.info(`✅ Job ${job.id} completado com sucesso`);
    console.log(`✅ Job ${job.id} concluído`);
    setTimeout(async () => {
        await job.remove();
        console.log(`Job ${job.id} removido.`);
        logger.info(` Job ${job.id} Removido da fila`);
    }, 1000000);
});

emailWorker.on("failed", (job,err) => {
    logger.error(`❌ Job ${job.id} falhou. Erro: ${err.message}`);
    console.log(`❌ Job ${job.id} falhou: ${err.message}`);
});
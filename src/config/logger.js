const pino = require("pino");

const logger = pino({
    transport:{
        target: 'pino-pretty',
        options:{
            colorize:true,
            destination:'./logs/app.log'
        }
    }
})

module.exports = logger
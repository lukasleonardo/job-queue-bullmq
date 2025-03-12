# Usa a imagem oficial do Node.js
FROM node:18

# Define o diretório de trabalho
WORKDIR /src

# Copia os arquivos necessários
COPY package*.json ./
COPY . .

# Instala as dependências
RUN npm install

# Expõe a porta 3000 (ou a porta que sua API usa)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "src/server.js"]

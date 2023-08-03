# Estágio 1: Construção do Vue.js e Node.js
FROM node:16.20 AS build

# Upgrade npm to version 9.x (opcional, mas recomendado)
RUN npm install -g npm@8.19.4

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar package.json e package-lock.json para aproveitar o cache de dependências
COPY package*.json ./

# Instalar as dependências da aplicação
RUN npm install

# Copiar o restante dos arquivos do projeto para o container
COPY . .

# Executar o build da aplicação
RUN npm run build

# Estágio 2: Configuração do Nginx
FROM nginx:alpine

# Copia os arquivos estáticos do Vue.js da etapa de construção do Node.js
COPY ./build /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Executa o Nginx em primeiro plano
CMD ["nginx", "-g", "daemon off;"]


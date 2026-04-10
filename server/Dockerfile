FROM node:22-alpine

RUN apk add --no-cache openssl

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma/

RUN npm install

RUN npx prisma generate

COPY . .

RUN npm run build

EXPOSE 3000

RUN echo 'npm run migrate:deploy && npm run start' > start.sh && chmod +x start.sh

CMD ["node", "dist/main"]
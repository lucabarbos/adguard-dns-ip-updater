FROM node:20-alpine

WORKDIR /app

COPY package.json ./
RUN npm ci --omit=dev

COPY src/app.js ./src/

CMD ["node", "src/app.js"]

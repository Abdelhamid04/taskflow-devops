FROM node:24-alpine

WORKDIR /app

RUN apk upgrade --no-cache && npm install --global npm@latest

COPY package*.json ./

RUN npm ci --omit=dev

RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx

COPY . .

ENV NODE_ENV=production

EXPOSE 5000

CMD ["node", "server.js"]
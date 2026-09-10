FROM node:24-alpine

WORKDIR /app

RUN apk upgrade --no-cache && npm install --global npm@latest

COPY package*.json ./

RUN npm ci --omit=dev

RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx

COPY server.js ./
COPY routes ./routes
COPY models ./models

ENV NODE_ENV=production

USER node

EXPOSE 5000

CMD ["node", "server.js"]
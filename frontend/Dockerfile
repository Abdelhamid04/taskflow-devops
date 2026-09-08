<<<<<<< Updated upstream
FROM node:24-alpine AS build
=======
FROM node:22-alpine AS build
>>>>>>> Stashed changes

WORKDIR /app

RUN apk upgrade --no-cache && npm install --global npm@latest

COPY package*.json ./
RUN npm ci

COPY . .

ARG VITE_API_URL=http://localhost:5000/api
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

<<<<<<< Updated upstream
FROM node:24-alpine
=======
FROM node:22-alpine
>>>>>>> Stashed changes

WORKDIR /app
RUN apk upgrade --no-cache && npm install --global npm@latest vite
RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx

COPY --from=build /app/dist ./dist

ENV NODE_ENV=production
EXPOSE 4173

CMD ["vite", "preview", "--host", "0.0.0.0", "--port", "4173"]

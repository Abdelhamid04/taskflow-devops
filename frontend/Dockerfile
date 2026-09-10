FROM node:24-alpine AS build

WORKDIR /app

RUN apk upgrade --no-cache && npm install --global npm@latest

COPY package*.json ./
RUN npm ci

COPY . .

ARG VITE_API_URL=http://localhost:5000/api
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

FROM node:24-alpine

WORKDIR /app

RUN apk upgrade --no-cache && npm install --global npm@latest vite
RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx

COPY --from=build /app/dist ./dist
RUN printf '%s\n' 'export default { preview: { allowedHosts: true } };' > vite.config.js
ENV NODE_ENV=production

EXPOSE 4173

CMD ["vite", "preview", "--host", "0.0.0.0", "--port", "4173"]
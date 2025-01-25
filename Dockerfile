FROM node:20-alpine3.21 AS base

WORKDIR /app
COPY package*.json .
RUN npm install

FROM base AS build
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM nginx:alpine3.20-slim
WORKDIR /var/www/medex/
COPY --from=build /app/dist/ .
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

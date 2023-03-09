first 3 mods
--docker terminology
--commands on containers
--images deepdive

4th mod proj code
--setting get req on node
--WORKDIR COPY ./ ./ default cmd
######## doc
WORKDIR /usr/app
COPY ./package.json ./
RUN npm install
COPY ./ ./

5th mod docker compose*************
--index make exp redis client on ports. set cache var incr and send
--1 doc file 1 comp file
######## doc
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
######## compose  2 services redis and node-app
version: '3'
services:
  redis-server:
    image: 'redis'
  node-app:
    restart: on-failure
    build: .
    ports:
      - '4001:8081'

6th mod*************
USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node ./package.json ./
RUN npm install
COPY --chown=node:node ./ ./

7th mod*************
FROM node:16-alpine as builder
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 80
COPY --from=builder /app/build /usr/share/nginx/html
####### docker compose
version: "3"
services:
  web:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - /app/node_modules
      - .:/app
8th MOD*************
REACT
9th MOD*************

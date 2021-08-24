# Dockerfile that will build the judging image  

FROM node:14-buster-slim

RUN npm install --global playwright
ENV NODE_PATH=/usr/local/lib/node_modules
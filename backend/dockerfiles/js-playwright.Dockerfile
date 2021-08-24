# Dockerfile that will build the judging image  

FROM mcr.microsoft.com/playwright

ENV NODE_VERSION=14.17.4
RUN apt install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash -
RUN apt install nodejs

RUN npm install --global playwright
RUN npx playwright install
ENV NODE_PATH=/usr/lib/node_modules
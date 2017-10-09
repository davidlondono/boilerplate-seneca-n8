############################################################
# Dockerfile to build Math microservice image
# Based on node image
# By: Santiago Sanchez Taborda
###########################################################

FROM node:8.4.0
MAINTAINER Santiago Sánchez Taborda "santiago.sanchez.t@gmail.com"

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY src /usr/src/app/src
COPY package.json /usr/src/app
COPY .env.test /usr/src/app

RUN npm install

ENV NODE_ENV test

ENTRYPOINT ["npm", "start"]

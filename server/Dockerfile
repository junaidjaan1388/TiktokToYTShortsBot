FROM node:18.17.0

USER root

RUN apt-get update && apt-get install -y nscd

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

#build Typescrtipt Files
RUN npm run build


EXPOSE 8080


CMD [ "node", "./dist/server.js" ]
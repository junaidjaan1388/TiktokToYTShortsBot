FROM node:18.17.0

# Install necessary packages including nscd
RUN apt-get update && apt-get install -y \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

#build Typescrtipt Files
RUN npm run build


EXPOSE 8080


CMD [ "node", "./dist/server.js" ]
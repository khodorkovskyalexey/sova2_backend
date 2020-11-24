FROM node:14

WORKDIR /usr/app/

COPY package*.json ./
COPY yarn.*lock ./

RUN yarn install

COPY . .

EXPOSE 8081
CMD [ "node", "./src/index.js" ]
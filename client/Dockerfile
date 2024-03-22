FROM node:21-bookworm

WORKDIR /client

COPY package.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
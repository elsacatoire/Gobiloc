FROM node:21

WORKDIR /client
COPY client/package*.json ./
RUN npm install
COPY . .
RUN npm run dev
FROM node:21

WORKDIR /client

# Configure permissions
ARG UID=1000
RUN userdel node && useradd --uid $UID --create-home user
USER user
RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
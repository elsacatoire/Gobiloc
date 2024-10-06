# syntax=docker/dockerfile:1.4

# 1. For build React app
FROM node:lts AS development

# Set working directory
WORKDIR /frontend

# 
COPY package.json /frontend/package.json
COPY package-lock.json /frontend/package-lock.json

# Same as npm install
RUN npm ci

COPY . /frontend

ENV CI=true
ENV PORT=3000

CMD [ "npm", "start" ]

FROM development AS build

RUN npm run build


FROM development as dev-envs
RUN <<EOF
apt-get update
apt-get install -y --no-install-recommends git
EOF

RUN <<EOF
useradd -s /bin/bash -m vscode
groupadd docker
usermod -aG docker vscode
EOF
# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /
CMD [ "npm", "start" ]

# 2. For Nginx setup
FROM nginx:alpine as production

COPY --from=build /frontend/.next/static /usr/share/nginx/html/static
COPY --from=build /frontend/.next/server /usr/share/nginx/html/server

# Copy config nginx
COPY --from=build /frontend/.nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]

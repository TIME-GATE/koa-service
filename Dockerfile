FROM node:7.10

RUN npm config set registry https://registry.npm.taobao.org &&\
    npm install -g pm2

WORKDIR /var/workspace

COPY package.json .

RUN npm install --production && npm cache clean

COPY . .

EXPOSE 3000

CMD ["pm2-docker", "app.js"]

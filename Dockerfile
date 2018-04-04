FROM node:7.10

RUN npm config set registry https://registry.npm.taobao.org &&\
    npm install -g pm2 &&\
    npm install -g node-gyp

RUN echo "Asia/shanghai" > /etc/timezone        ## 修改时区
RUN dpkg-reconfigure -f noninteractive tzdata

WORKDIR /var/workspace

COPY . .

RUN npm install --production && npm cache clean

RUN node-gyp configure      ## 编译C++

RUN node-gyp build

EXPOSE 3000

CMD ["pm2-docker", "app.js"]

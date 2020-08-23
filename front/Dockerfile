FROM node:14.8.0-alpine3.12
RUN mkdir /src
WORKDIR /src
ADD package.json /src/
RUN npm install
ADD . /src/
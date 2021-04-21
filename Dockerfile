FROM node:14-alpine

ADD . /bnbexplorer-frontend/

WORKDIR /bnbexplorer-frontend

FROM alpine:3.5
RUN apk update
RUN apk add git

RUN npm install

CMD ["npm", "start"]

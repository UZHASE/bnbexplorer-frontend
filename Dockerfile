FROM node:14-alpine

ADD . /bnbexplorer-frontend/

WORKDIR /bnbexplorer-frontend

FROM alpine:3.5
RUN apk update
RUN apk add git
RUN apk add --update nodejs npm
RUN apk add --update npm
RUN npm install

CMD ["npm", "start"]

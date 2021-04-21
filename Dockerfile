FROM node:14-alpine

ADD . /bnbexplorer-frontend/

WORKDIR /bnbexplorer-frontend

FROM alpine:3.5
RUN apk update
RUN apk add git
RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs \
    npm

CMD ["npm", "start"]

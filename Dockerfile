FROM node:14-alpine

ADD . /bnbexplorer-frontend/

WORKDIR /bnbexplorer-frontend

RUN yarn install

CMD ["yarn", "start"]
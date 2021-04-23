FROM node:14

ADD . /bnbexplorer-frontend/

WORKDIR /bnbexplorer-frontend

RUN npm install

CMD ["npm", "start"]

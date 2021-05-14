FROM node:14

ADD . /bnbexplorer-frontend/

WORKDIR /bnbexplorer-frontend

RUN npm i

CMD ["npm", "start"]

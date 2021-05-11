FROM node:14

ADD . /bnbexplorer-frontend/

WORKDIR /bnbexplorer-frontend

RUN npm install

RUN npm install --unsafe-perm git+https://github.com/fabiank0/google-map-react.git

CMD ["npm", "start"]

FROM node:14

ADD . /bnbexplorer-frontend/

WORKDIR /bnbexplorer-frontend

RUN npm install \
    && npm install --unsafe-perm git+https://github.com/fabiank0/google-map-react.git \
    && cd node_modules/google-map-react \
    && npm install microbundle-crl \
    && npm run-script build

CMD ["npm", "start"]

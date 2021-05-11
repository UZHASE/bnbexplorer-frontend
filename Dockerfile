FROM node:14

ADD . /bnbexplorer-frontend/

WORKDIR /bnbexplorer-frontend

RUN npm install

RUN npm install --unsafe-perm git+https://github.com/fabiank0/google-map-react.git
RUN cd /node_modules/google-map-react
RUN npm build
RUN cd ..

CMD ["npm", "start"]

FROM node:17

WORKDIR /myfolder/

COPY ./packge.json /myfolder/
COPY ./yarn.lock /myfolder/
RUN yarn install

COPY . /myfolder/

CMD yarn dev

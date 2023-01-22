FROM node:18-alpine

ADD package.json /app/package.json

RUN cd /app && \
    yarn install --production

ADD . /app/

CMD ["node", "/app/app.js"]

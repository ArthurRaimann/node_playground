FROM node:16

# We have to install nodemon globally before moving into the working directory
RUN yarn global add nodemon

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN yarn

# Bundle app source
COPY . .

EXPOSE 8080
CMD ["bash", "start.sh"]

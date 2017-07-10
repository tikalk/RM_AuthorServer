FROM node:boron

# Create app directory
RUN mkdir -p /deploy
WORKDIR /deploy

# Install app dependencies
COPY . /deploy
RUN npm install

EXPOSE 8080
CMD [ "npm", "start" ]
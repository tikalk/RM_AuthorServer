FROM node:boron

# Create app directory
RUN mkdir -p /deploy
WORKDIR /deploy

# Install app dependencies
COPY . /deploy
RUN npm install -g typescript
RUN npm install -g typings
RUN npm install
RUN typings install

EXPOSE 8080
CMD [ "npm", "start" ]
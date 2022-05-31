#install base image of node
FROM node:16-alpine
WORKDIR /usr/src/app

#copy package files into the container
COPY package*.json ./

#install the dependancies
RUN npm install

#copy source files
COPY . .

#expose the required ports
EXPOSE 3000

#start the applictin
CMD npm start
FROM node:16
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . ./
CMD node script.js
EXPOSE 8081


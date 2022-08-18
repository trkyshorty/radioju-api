FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/radioju-api

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# npm i bcrypt needed python3
RUN apk --no-cache add --virtual .builds-deps build-base python3

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000

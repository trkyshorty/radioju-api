FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app/radioju-api

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN apk --no-cache add --virtual .builds-deps build-base python3

RUN npm install

COPY . .

EXPOSE 4080

CMD ["npm", "start"]

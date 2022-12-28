## Radioju API

- Brain of my [Radioju](https://github.com/trkyshorty/radioju) app, developed with express.js

## Requirements

- Docker

## Server Configuration

Start:

```bash
# run docker container in development mode
yarn docker:dev

# run docker container in production mode
yarn docker:prod
```

Backup & Restore:

```bash
# run mongodump and create backup radioju collections
docker exec -i <container-name> /usr/bin/mongodump --uri=mongodb://mongodb:27017/radioju --out /dump

# Copy to backup output folder to host root directory
docker cp <container-name>:/dump /root/dump

# Copy to backup folder to new mongodb container
docker cp /root/dump <container-name>:/dump

# Restore backup
docker exec -i <container-name> /usr/bin/mongorestore --uri=mongodb://mongodb:27017/radioju /dump/radioju
```

Linting:

```bash
# run ESLint
yarn lint

# fix ESLint errors
yarn lint:fix

# run prettier
yarn prettier

# fix prettier errors
yarn prettier:fix
```

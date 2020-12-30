# personal-dashboard-server

## Getting Started

- `docker-compose up -d` to start up server and db
- `localhost:4000` will be used for server (change docker-compose.yml if necessary)
- `localhost:4000` will be used for db
- `localhost:6379` will be used for redis

## Development Guide

- Developed with NodeJS, Express, and Sequelize.
- A simple backend API for my personal dashboard ([click here](https://github.com/danielkim107/dashboard)).
- `/restartDb` will recreate the DB with the defined models.
- `/random` will create a random Entry if userId = 1 exists.

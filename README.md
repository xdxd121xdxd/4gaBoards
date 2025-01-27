# 4ga Boards

![GitHub release (latest by date)](https://img.shields.io/github/v/release/RARgames/4gaBoards?color=orange&style=flat-square)![GitHub](https://img.shields.io/github/license/rargames/4gaBoards?style=flat-square)![GitHub contributors](https://img.shields.io/github/contributors/rargames/4gaboards?style=flat-square)

Kanban boards inspired by discontinued Gitkraken Glo Boards.

![](https://raw.githubusercontent.com/plankanban/planka/master/demo.gif)

We'll work on a **demo** when we finish all tasks from the [#1 issue](https://github.com/RARgames/4gaBoards/issues/1).

## Features

- Create projects, boards, lists, cards, labels and tasks
- Add card members, track time, set a due date, add attachments, write comments
- Markdown support in a card description and comment
- Filter by members and labels
- Customize project background
- Real-time updates
- User notifications
- Internationalization

## Deploy

There are 2 types of installation:
1. [Dockerized](#1-docker-compose)
2. [Without Docker](#2-without-docker)


### 1. Docker Compose

[![](https://d207aa93qlcgug.cloudfront.net/1.95.5.qa/img/nav/docker-logo-loggedout.png)](https://github.com/RARgames/4gaBoards/pkgs/container/4gaBoards)

- Make sure you have [Docker](https://docs.docker.com/install/) and [Docker Compose](https://docs.docker.com/compose/install/) installed and operational.
- Create `docker-compose.yml` based on [the example](https://raw.githubusercontent.com/RARgames/4gaBoards/main/docker-compose.yml). This is the ONLY file you will need. You can create this file on your own machine by copy and pasting the content.
- Edit `BASE_URL` to match your domain name or IP address.
- Edit `SECRET_KEY` with random value. You can generate it by `openssl rand -hex 64`.

Download the docker-compose.yml:

```
curl -L https://raw.githubusercontent.com/RARgames/4gaBoards/main/docker-compose.yml -o docker-compose.yml
```

Pull images and start services:

```
docker compose up -d
```

Default url: http://localhost:3000
Demo user: demo
Demo password: demo

### 2. Without Docker

Installing without Docker is a bit more complicated, here's what you need to do:

1. Clone this repository into a directory of your choice. (e.g. `/var/www/4gaBoards`)

```bash
mkdir -p /var/www/4gaBoards
cd /var/www/4gaBoards
git clone https://github.com/RARgames/4gaBoards.git .
```

2. Install dependencies, build client, copy build to the `server` directory.

```bash
npm i
npm run client:build

cp -r client/build server/public
cp client/build/index.html server/views/index.ejs
```

**Note**: You can use `yarn` or `pnpm` instead of `npm`.

3. Configure environment variables.

```bash
cp server/.env.sample server/.env

# Edit .env file (You could use nano, vim, etc.)
nano server/.env
```

**Note**: Before continuing, make sure you have your selected database created and running.

4. Copy start script from the root directory to the `server` directory and start the server.

```bash
cp start.sh server
cd server
./start.sh
```

**Note**: You can use `pm2` or `systemd` to run the server in the background.

Default url: http://localhost:1337
Demo user: demo
Demo password: demo

## [Additional information (Nginx Configuration, Logging, Rotating Logs, Fail2ban)](https://github.com/RARgames/4gaBoards/blob/main/docs/ADDITIONAL_INFO.md)

## Backup and Restore

To backup your data use: `./boards-backup.sh`.

To restore it use: `./boards-restore.sh 4gaBoards-backup.tgz`.

## Import from Trello

It's already available in 4ga Boards. Just add a project, then click Import while creating a new board.

## [Migration from Planka](https://github.com/RARgames/4gaBoards/blob/main/docs/MIGRATION.md)

## Development

Clone the repository into a directory of your choice, install dependencies, copy .env:

```
git clone https://github.com/RARgames/4gaBoards.git .
npm i
cp server/.env.sample server/.env
```

Either use a local database or start the provided development database:

```
docker compose -f docker-compose-dev.yml up
```

Edit `DATABASE_URL` in `server/.env` if needed, then initialize the database:

```
npm run server:db:init
```

Start the development server:

```
npm start
```

Demo user: demo
Demo password: demo

## [Contributing](https://github.com/RARgames/4gaBoards/blob/main/docs/CONTRIBUTING.md)

## [Security](https://github.com/RARgames/4gaBoards/blob/main/docs/SECURITY.md)

## Tech stack

- React, Redux, Redux-Saga, Redux-ORM, Semantic UI React, react-beautiful-dnd
- Sails.js, Knex.js
- PostgreSQL

## License

4ga Boards are [MIT licensed](https://github.com/RARgames/4gaBoards/blob/main/LICENSE).

Project was separated from [Planka](https://github.com/plankanban/planka) by [meltyshev](https://github.com/meltyshev) to preserve the MIT license, change project vision, and add some new features.


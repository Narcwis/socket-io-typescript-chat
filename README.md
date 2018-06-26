
Alcumus Chat Repo
=========================================

This repository contains server & client side code  forked from [luixaviles] (https://github.com/luixaviles/socket-io-typescript-chat) and further developed to contain an emoji-picker, developed to be PWA and draft features added

## Live Demo
Try live demo: 
[https://alcumus-chat.firebaseapp.com/](https://alcumus-chat.firebaseapp.com/)

*This needs a local server to be running*

# Running Server and Client locally
## Prerequisites

First, ensure you have the following installed:

1. NodeJS - Download and Install latest version of Node: [NodeJS](https://nodejs.org)
2. Git - Download and Install [Git](https://git-scm.com)
3. Angular CLI - Install Command Line Interface for Angular [https://cli.angular.io/](https://cli.angular.io/)

After that, use `Git bash` to run all commands if you are on Windows platform.

## Clone repository

In order to start the project use:

```bash
$ git clone https://github.com/narcwis/socket-io-typescript-chat.git
$ cd socket-io-typescript-chat
```

## Run Server

To run server locally, just install dependencies and run `gulp` task to create a build:

```bash
$ cd server
$ npm install -g gulp-cli
$ npm install
$ gulp build
$ npm start
```

The `socket.io` server will be running on port `8080`

## Run Angular Client

Open other command line window and run following commands:

```bash
$ cd client
$ npm install
$ ng serve
```

Now open your browser in following URL: [http://localhost:4200](http://localhost:4200/)


# Contribution
Contributions are greatly appreciated.

# Contributors
[<img alt="narcwis" src="https://avatars0.githubusercontent.com/u/9106275?s=460&v=4" width="117">](https://github.com/narcwis) |

## License

MIT

[![Build Status](https://www.travis-ci.com/UZHASE/bnbexplorer-frontend.svg?branch=main)](https://www.travis-ci.com/UZHASE/bnbexplorer-frontend)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=uzhase_bnbexplorer-frontend&metric=alert_status)](https://sonarcloud.io/dashboard?id=uzhase_bnbexplorer-frontend)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=uzhase_bnbexplorer-frontend&metric=coverage)](https://sonarcloud.io/dashboard?id=uzhase_bnbexplorer-frontend)

# BnB Explorer Frontend
***
## Open Project [Documentation](https://github.com/UZHASE/bnbexplorer-docker/wiki)

- Source code documentation can be found [here](https://uzhase.github.io/bnbexplorer-frontend/index.html)

***
## Running with Docker

To run the full project, including the backend, the setup guidelines can be found [here](https://github.com/UZHASE/bnbexplorer-docker).

***

The recommended way to run the frontend of the project is to run it in a [Docker container](https://www.docker.com/). <br>
Thus, the following commands need to be entered in the root directory.

```bash
# building the frontend image
docker build -t frontend .

# starting the container
docker run -p 3000:3000 frontend
```

***
## Local Project Setup

### Prerequisites

- To install the project, [npm](https://www.npmjs.com/get-npm) and [node](https://nodejs.org/en/download/package-manager/) are needed
- The application was tested with Node 14, though other versions may work as well

### Installation & Running the app

To install and run the project locally, enter these commands in the root directory:

```bash
# install the project
npm i

# run the project
npm start
```
***

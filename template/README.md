## DavidA React App

Highly opinionated (by DavidA) version of Create React App with all my favorite bells and whistles
Created from: https://www.npmjs.com/package/cra-template-davida  

## Features

- Bootstrapped with Create React App
- Google’s [Material Design](https://material.io) through Material-UI
- Routing with [React Router](https://reacttraining.com/react-router/web), including protected routes and error handling
- more soon...

## Setup/Update
The app depends on a local json-server. One-time setup as follows:
```bash
npm install -g json-server
```

Best way to get the newest version (it will change a lot) is to nuke the node-modules folder and re-install.

## Run
For now you will need to run both the API server and the app separately. 

In a terminal, start the app on port 3000
```bash
npm start
```

In another terminal, start the server on port 9000
```bash
cd json-server
json-server --watch db.json
```
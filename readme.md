# Photo App API

* The API for the Welp, Restaurant App.
* The API consists of 5 domain models with `has_many` and `belongs_to` associations.
* Sample data was pulled from a network request in Grubhub.
* The [repository](https://github.com/reireynoso/restaurant_app_react) to the client-side.
* The deployed application can be found [here](https://restaurant-client-react.herokuapp.com/home).
* Here is the link to the [demo](https://www.youtube.com/watch?v=1cgreYWLC1E).

# Getting Started
Before setting up, make sure the server is installed along with Node.js, NPMn and MongoDB.

## Prerequisites
If it is not installed, go in your terminal, and follow the steps:

1. Install the [server](https://github.com/reireynoso/restaurant_app_rails) 
2. Install [Node and NPM](https://www.npmjs.com/get-npm)
3. Install [MongoDB](https://www.mongodb.com/try/download/community)
    - The download is a zip file.
    - Unzip the contents, change the folder name to “mongodb”, and move it to your users home directory.
    - From there, create a “mongodb-data” directory in your user directory to store the database data.
    - You can start the server using the following command in your terminal: `/Users/example/mongodb/bin/mongod --dbpath=/Users/Andrew/mongodb-data`
    - Make sure to swap out “/Users/example/” with the correct path to your users home directory.

## Setup

From your terminal,

1. Clone the repo and `cd` into the folder
2. Install dependencies with `npm install`
3. Open the `index.js` and uncomment `seedData()` on line 8 for the first time the server runs to load seed files. (Uncomment it again once seeds are loaded.)
4. Launch the server with `npm run dev`

# Built With
NodeJS

# Tools
* Express
* Mongoose
* CORS
* Active Model Serializers
* BCryptJS
* JSON Web Tokens
* Cloudinary (photo uploads)
* Env-cmd (environment variables)

# Authors
Reinald Reynoso
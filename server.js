//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
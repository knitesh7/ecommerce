const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
function basicMiddlewares(app) {
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }));
    // Configure body-parser middleware to handle plain text
    app.use(bodyParser.text({ type: 'text/plain' }));
}

module.exports = basicMiddlewares
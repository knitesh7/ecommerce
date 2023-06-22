const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
function basicMiddlewares(app) {
    app.use(cors())
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));
    // Configure body-parser middleware to handle plain text
    app.use(bodyParser.text({ type: 'text/plain' }));
}

module.exports = basicMiddlewares
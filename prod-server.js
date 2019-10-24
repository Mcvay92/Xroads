const express = require('express');
const app = require('./server/app.js');
const PORT = 80;

app.use(express.static(__dirname + '/build'))

/* final catch-all route to index.html defined last */
app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/build/index.html');
})

app.listen(PORT);

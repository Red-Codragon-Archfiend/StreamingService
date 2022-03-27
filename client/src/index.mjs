'use strict';

import express from 'express';
import path from 'path';

const app = express();
const __dirname = path.resolve();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(3001, () => {
    console.log(`Hosting on port: 3001`)
});
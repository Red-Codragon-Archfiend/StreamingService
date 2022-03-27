'use strict';

import express from 'express';
import path from 'path';
import { statSync, createReadStream } from 'fs';

const app = express();
const __dirname = path.resolve();

app.get('/video', (req, res) => {
    const range = req.headers.range;
    if (!range) {
        res.status(400).send('Range header is requires');
    }

    const videoPath = path.join(__dirname, "/data/videos/test.mp4");
    const videoSize = statSync(videoPath).size;

    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };

    res.writeHead(206, headers);

    const videoStream = createReadStream(videoPath, { start, end });

    videoStream.pipe(res);
});

app.listen(3000, () => {
    console.log(`API listening on port: 3000`)
});

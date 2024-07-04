import { createGame, getGames } from "./controllers/gameController";
import bodyParser from "body-parser";
import express from "express";
import next from "next";

const dev = process.env.NODE_ENY !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();
    server.use(bodyParser.json());

    server.get('/api/games', getGames);
    server.post('/api/games', createGame);

    server.all('*', (req, res) => {
        return handle(req, res);
    });

    const port = process.env.PORT || 3000;
    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`Server is ready on http://localhost:${port}`);
    })

})
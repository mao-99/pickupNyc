// server.js or index.js
import { createGame, getGames } from '../controllers/gameController.mjs';
import express from 'express';
import cors from 'cors';


const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'], // Specify allowed HTTP methods
  allowedHeaders: ['Content-Type'], // Specify allowed headers
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

app.get('/api/games', (req,res) => {
    //getGames(req,res);
    console.log('Received GET request at /api/games');
    getGames(req,res);
})

app.post('/api/games', (req,res) => {
    //createGame(req,res);
    console.log('Received POST request at /api/games');
    createGame(req,res);
})

app.listen(3001, () => {
    console.log('Server running on port 3001');
})
// server.js or index.js

const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'], // Specify allowed HTTP methods
  allowedHeaders: ['Content-Type'], // Specify allowed headers
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

app.get('/api/games', (req,res) => {
    res.send('Hello World');
})

app.listen(3001, () => {
    console.log('Server running on port 3001');
})
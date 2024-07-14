import axios from "axios";
import prisma from "../../../prisma/index.mjs";
// id Int @id @default(autoincrement())
// date DateTime @default(now())
// location String
// borough String
// count Int @default(0)
// total Int @default(14)
// pickup Boolean @default(true)
// price Float @default(0)
// sport String

export const createGame = async (req, res) => {
    console.log(req.body) // Log the request
    const myObj = {title: req.body.game, date: new Date(req.body.date+'T00:00:00.000Z'), location: req.body.location.address, total: parseInt(req.body.total, 10), count: 0, paid: false, rules: req.body.rules }
    try {
        const newGame = await prisma.games.create( { data: myObj });
        res.status(201).json(newGame);
    }
    catch (error) {
        console.error('Error creating game:', error); // Log the error
        res.status(400).json({ error: error.message });
    }

    // try {
    //     const newGame = await prisma.game.create({ data: req.body });
    //     res.status(201).json(newGame);
    // } catch (error) {
    //     console.error('Error creating game:', error); // Log the error
    //     res.status(400).json({ error: error.message });
    // }
};

export const getGames = async (req, res) => {
    // try {
    //     const games = await prisma.game.findMany();
    //     res.status(200).json(games);
    // } catch (error) {
    //     res.status(500).json({ error: error.message });
    // }
    console.log("Received GET request at /api/games")
    const games = await prisma.games.findMany();
    res.status(200).json(games);
    console.log(games);
};

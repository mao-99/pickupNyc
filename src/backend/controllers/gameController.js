import { prisma } from "../prisma/index";
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
    const testGame = {date: new Date(), location: "Central Park", borough: "Manhattan", count: 0, total: 14, pickup: true, price: 0, sport: "Basketball"}
    try {
        const newGame = await prisma.game.create({data: testGame})
        res.status(201).json(newGame)
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

export const getGames = async (req, res) => {
    try {
        const games = await prisma.game.findMany();
        res.json(games)
        console.log(games)
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}
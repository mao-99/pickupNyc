'use client'
import axios from "axios";
import { useState, useEffect } from "react";

export default function DatabaseGames() {
    const [games, setGames] = useState([]);
    const [today, setToday] = useState(new Date());
    useEffect(() => {
        async function getGames() {
            const db = await axios.get('http://localhost:3001/api/games');
            setGames(db.data);
        }
        getGames();
    }, [])
    useEffect(() => {
        console.log(games);
    }, [games])

    return (
        <>
            {games.length}
            {today.toString()}
            
        </>
    )
}
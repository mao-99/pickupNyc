"use client"
import Link from "next/link";
import styles from "../games.module.css";
import { useState } from "react";
import LocationInput from "@/app/components/locationInput";
import axios from "axios";

const mapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;


export default function AddPickupPage() {
  
  const [games, setGames] = useState([]);
  const [formData, setFormData] = useState({game: '', date: '', location: {lat: null , lng: null , address: ''}, total: 0, time: '', rules: '', borough: ''})
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  const handleSelect = (e) => {
    console.log(e.target.value)
    console.log(e.target.name)
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: 'include' // Send cookies and other credentials
      });
      const request = await axios.get('http://localhost:3001/api/games');
      console.log('Real deal Request:', request);
      const data = await response.json();
      console.log('Data:', data); // Handle response data as needed
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getGames = async () => {
    const response = await fetch('http://localhost:3001/api/games', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include' // Send cookies and other credentials
    });
    const data = await response.json();
    console.log('Data:', data); // Handle response data as needed
  };
  
  const handleAddressChange = (coordinates, address, bor) => {
    setFormData({
      ...formData,
      borough : bor,
      location: {
        lat: coordinates?.lat ?? null,
        lng: coordinates?.lng ?? null,
        address : address,
      },
    });
  }

  return (
    <>
      <div className={styles.rightAlignedRow}>
          <Link href='/pickups/' className={styles.button}>Go back</Link>
      </div>
      <div className={styles.pageDiv}>
        <h1 className={styles.header}>Add Pickup</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="game">Game</label>
          <input type="text" id="game" name="game" className={styles.formInput} placeholder="Enter Game Name" onChange={handleChange}/>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" className={styles.formInput} onChange={handleChange} defaultValue={Date.now}/>
          <LocationInput className={styles.formInput} onAddressChange={handleAddressChange}/>
          <label htmlFor="time">Time</label>
          <input type="time" id="time" name="time" className={styles.formInput} onChange={handleChange}/>
          <label htmlFor="count">Total</label>
          <input type="number" id="total" name="total" min={0} className={styles.formInput} placeholder="0" onChange={handleChange}/>
          <label htmlFor="rules">Rules</label>
          <input type="textarea" className={styles.formInput} placeholder="Game rules" name="rules" onChange={handleChange}/>
          <button onClick={getGames}>Get Games</button>
          <button type="submit" className={styles.buttonPrimary }>Add Pickup</button>
        </form>

        <ul>
          {games.map((game) => (
            <li key={game.id}>{game.location} - {game.sport}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
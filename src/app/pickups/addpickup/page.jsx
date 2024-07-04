"use client"
import Link from "next/link";
import { useEffect } from "react";
import styles from "../pickups.module.css";
import { ChangeEvent, FormEvent, useState } from "react";
import LocationInput from "@/app/components/locationInput";
import Script from "next/script";

const mapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;


export default function AddPickupPage() {
  
  const [games, setGames] = useState([]);
  const [formData, setFormData] = useState({sport: '', game: '', date: '', location: {lat: null , lng: null , address: ''}, count: 0, time: '', description: ''})
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
    console.log(formData);
    const res = await fetch('/api/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const newGame = await res.json();
    setGames([...games, newGame]);

  }
  const handleAddressChange = (coordinates, address) => {
    setFormData({
      ...formData,
      location: {
        lat: coordinates?.lat ?? null,
        lng: coordinates?.lng ?? null,
        address : address,
      },
    });
  }
  return (
    <>
      <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${mapsKey}&libraries=places&loading=async`}
          strategy="beforeInteractive"
      />
      <div className={styles.rightAlignedRow}>
          <Link href='/pickups/' className={styles.button}>Go back</Link>
      </div>
      <div className={styles.pageDiv}>
        <h1 className={styles.header}>Add Pickup</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="sport">Choose Sport</label>
          <select name="sport" id="" className={styles.formInput} onChange={handleSelect}>
            <option value="">Select Sport</option>
            <option value="soccer">Soccer</option>
            <option value="basketball">Basketball</option>
            <option value="volleyball">Volleyball</option>
            <option value="football">Football</option>
            <option value="tennis">Tennis</option>
          </select>
          <label htmlFor="game">Game</label>
          <input type="text" id="game" name="game" className={styles.formInput} placeholder="Enter Game Name" onChange={handleChange}/>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" className={styles.formInput} onChange={handleChange}/>
          <LocationInput className={styles.formInput} onAddressChange={handleAddressChange}/>
          <label htmlFor="count">Count</label>
          <input type="number" id="count" name="count" min={1} className={styles.formInput} placeholder="0" onChange={handleChange}/>
          <label htmlFor="time" >Time</label>
          <input type="time" id="time" name="time" className={styles.formInput} onChange={handleChange}/>
          <label htmlFor="description">Add Description</label>
          <input type="textarea" className={styles.formInput} placeholder="Game description" name="description" onChange={handleChange}/>
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
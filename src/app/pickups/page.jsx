import styles from './pickups.module.css';
import Link from 'next/link';
import Script from 'next/script';

const mapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const loadedMapsApi = () => {
    console.log("Maps API loaded");
  }
  
const loadedMapsApiError = () => {
console.error("Error loading Maps API");
}

export default function Pickup() {
    return (
        <>  
            <Script
                src={`https://maps.googleapis.com/maps/api/js?key=${mapsKey}&libraries=places&loading=async`}
                strategy="beforeInteractive"
            />
            <div className={styles.rightAlignedRow}>
                <Link href='/pickups/addpickup' className={styles.button}>Add a game</Link>
            </div>
        </>
    )
}
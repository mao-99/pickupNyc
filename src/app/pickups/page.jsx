import styles from './pickups.module.css';
import Link from 'next/link';

export default function Pickup() {
    return (
        <>  
            <div className={styles.rightAlignedRow}>
                <Link href='/pickups/addpickup' className={styles.button}>Add a game</Link>
            </div>
        </>
    )
}
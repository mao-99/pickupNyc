import styles from "./games.module.css";
import Link from "next/link";

export default function Games() {
    return (
        <>
            <div className={styles.pageDiv}>
                <h1>Games</h1>
                <ul>These are all the games
                    <li>
                        Game onSelect
                    </li>
                    <li>
                        <div className={styles.rightAlignedRow}>
                            <Link href='/games/addpickup' className={styles.button}>Add a game</Link>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}
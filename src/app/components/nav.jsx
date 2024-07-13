'use client';
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import styles from "./nav.module.css";


export default function Nav() {
    const [toggle, setToggle] = useState(false);
    const toggleNav = () => {
        console.log("Toggling Nav");
        setToggle(!toggle);
    }
    return (
        <nav className={styles.nav}>
            <div className={styles.row}>
                <div className={styles.logo}>
                    <Link href="/">
                        <Image src="/logo_transparent_resized.png" alt="Pickup NYC Logo" width={100} height={50} priority={true} style={{width:'auto', height:'auto'}}/>
                    </Link>
                </div>
                <div className={styles.navButton} onClick={toggleNav}>
                    <div className={styles.navButtonBar}></div>
                    <div className={styles.navButtonBar}></div>
                    <div className={styles.navButtonBar}></div>
                </div>
                <ul className={styles.navLinks}>
                    <li className={styles.navLink}>
                        <Link href="/">
                            Home
                        </Link>
                    </li>
                    <li className={styles.navLink}>
                        <Link href="/games">
                            Games
                        </Link>
                    </li>

                    <li className={styles.navLink}>
                        <Link href="/timeline">
                            Timeline
                        </Link>
                    </li>
                </ul>
            </div>
            {
                toggle && (
                    <div className={styles.navbarDropdown}>
                        <ul className={styles.dropdownLinks}>
                            <li className={styles.dropdownLinks}>
                                <Link href="/">
                                    Home
                                </Link>
                            </li>
                            <li className={styles.dropdownLinks}>
                                <Link href="/games">
                                    Games
                                </Link>
                            </li>

                            <li className={styles.dropdownLinks}>
                                <Link href="/timeline">
                                    Timeline
                                </Link>
                            </li>
                        </ul>
                    </div>
                )
            }
        </nav>
    );
}
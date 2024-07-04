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
                        <Link href="/about">
                            About
                        </Link>
                    </li>
                    <li className={styles.navLink}>
                        <Link href="/games">
                            Find A Game
                        </Link>
                    </li>
                    <li className={styles.navLink}>
                        <Link href="/forum">
                            Forum
                        </Link>
                    </li>
                    <li className={styles.navLink}>
                        <Link href="/pickups">
                            Pickup Games
                        </Link>
                    </li>
                    <li className={styles.navLink}>
                        <Link href="/profile">
                            My Profile
                        </Link>
                    </li>
                    <li className={styles.navLink}>
                        <Link href="/contact">
                            Contact Us
                        </Link>
                    </li>
                </ul>
            </div>
            {
                toggle && (
                    <div className={styles.navbarDropdown}>
                        <ul className={styles.dropdownLinks}>
                            <li className={styles.dropdownLink}>
                                <Link href="/">
                                    Home
                                </Link>
                            </li>
                            <li className={styles.dropdownLink}>
                                <Link href="/about">
                                    About
                                </Link>
                            </li>
                            <li className={styles.dropdownLink}>
                                <Link href="/games">
                                    Find A Game
                                </Link>
                            </li>
                            <li className={styles.dropdownLink}>
                                <Link href="/forum">
                                    Forum
                                </Link>
                            </li>
                            <li className={styles.dropdownLink}>
                                <Link href="/pickups">
                                    Pickup Games
                                </Link>
                            </li>
                            <li className={styles.dropdownLink}>
                                <Link href="/profile">
                                    My Profile
                                </Link>
                            </li>
                            <li className={styles.dropdownLink}>
                                <Link href="/contact">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                )
            }
        </nav>
    );
}
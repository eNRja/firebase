import React from "react";
import Logo from "../../image/logo.svg";
import styles from "./Header.module.css";
import { Link, useLocation } from "react-router-dom";

export function Header() {
  const { pathname } = useLocation();
  const isIndex = pathname === "/";
  const isPromotions = pathname === "/promotions";

  return (
    <header className={styles.Header}>
      <img src={Logo} className={styles.HeaderLogo} alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <Link
        className={styles.HeaderLink}
        to="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </Link>
      <div>
        {!isIndex && (
          <Link className={styles.HeaderLink} to="/">
            Home
          </Link>
        )}
        {!isPromotions && (
          <Link className={styles.HeaderLink} to="/promotions">
            Promotions
          </Link>
        )}
      </div>
    </header>
  );
}

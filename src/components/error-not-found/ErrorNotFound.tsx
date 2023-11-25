import React from "react";
import styles from "./ErrorNotFound.module.css";
import { Link } from "react-router-dom";

export function ErrorNotFound() {
  return (
    <div className={styles.ErrorNotFound}>
      <p>Oops!! Something wrong</p>
      <Link to="/">Home</Link>
    </div>
  );
}

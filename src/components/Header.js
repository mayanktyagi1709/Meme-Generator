import React from "react";
import styles from "../styles/Header.module.css";

const Header = () => {
  return (
    <h1 className={styles.first}>
      <span className={styles.last}>Meme </span>Generator
    </h1>
  );
};

export default Header;

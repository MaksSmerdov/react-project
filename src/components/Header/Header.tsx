import React from "react";
import styles from "./Header.module.scss";

interface HeaderProps {
  title: string;
  currentTime: Date;
}

const Header: React.FC<HeaderProps> = ({ title, currentTime }) => (
  <div className={styles.header}>
    <h1 className={styles.header__title}>
      <span className={styles.header__titleSpan}>Карбон</span>
      {title}
    </h1>
    <div className={styles.header__box}>
      <span className={styles.header__date}>{currentTime.toLocaleDateString()}</span>
      <span className={styles.header__time}>{currentTime.toLocaleTimeString()}</span>
    </div>
  </div>
);

export default Header;

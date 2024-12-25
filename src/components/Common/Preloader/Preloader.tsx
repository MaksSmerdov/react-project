import React from "react";
import styles from "./preloader.module.scss";

interface LoaderProps {
  loading: boolean;
  size?: number;
}

const Loader: React.FC<LoaderProps> = ({ loading, size = 60 }) => {
  if (!loading) return null;

  return (
    <div className={styles.loaderContainer}>
      <div
        className={styles.loader}
        style={{ width: size, height: size }}
      ></div>
      <p className={styles.loaderText}>Идет загрузка, пожалуйста подождите</p>
    </div>
  );
};

export default Loader;
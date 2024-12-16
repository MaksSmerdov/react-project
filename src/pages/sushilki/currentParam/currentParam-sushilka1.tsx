import React, { useEffect, useState } from "react";
import styles from "./currentParam-sushilka.module.scss";

interface ApiData {
  temperatures: Record<string, number>;
  vacuums: Record<string, string>;
  gorelka: Record<string, number>;
}

const CurrentParameterSushilka1: React.FC = () => {
  const [data, setData] = useState<ApiData | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3002/api/sushilka1-data");
        const result: ApiData = await response.json();
        setData(result);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timeInterval);
  }, []);

  if (!data) return <p>Загрузка данных...</p>;

  const renderTable = (title: string, items: Record<string, number | string>, unit?: string) => (
    <table className={styles.table}>
      <caption className={styles.table__title}>{title}</caption>
      <thead className={styles.table__thead}>
        <tr className={styles.table__tr}>
          <th className={`${styles.table__th} ${styles.table__left}`}>Наименование параметра</th>
          <th className={styles.table__th}>Значение {unit}</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(items).map(([name, value]) => (
          <tr key={name} className={styles.table__tr}>
            <td className={`${styles.table__td} ${styles.table__left}`}>{name}</td>
            <td className={`${styles.table__td} ${styles.table__right}`}>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <div className={styles.currentParam}>
        <h1 className={styles.currentParam__title}>
          <span className={styles.currentParam__titleSpan}>Карбон</span>
          Вращающаяся сушилка №1
        </h1>
        <div className={styles.currentParam__box}>
          <span className={styles.currentParam__date}>{currentTime.toLocaleDateString()}</span>
          <span className={styles.currentParam__time}>{currentTime.toLocaleTimeString()}</span>
        </div>
      </div>

      <div className={styles.tables}>
        {renderTable("Текущие параметры (температура)", data.temperatures, "°C")}
        {renderTable("Текущие параметры (разрежения)", data.vacuums, "кгс/м²")}
        {renderTable("Текущие параметры (горелка)", data.gorelka)}
      </div>
    </div>
  );
};

export default CurrentParameterSushilka1;

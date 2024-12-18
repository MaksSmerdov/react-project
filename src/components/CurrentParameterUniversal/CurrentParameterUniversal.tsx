import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Table from "../Table/Table";
import styles from "./currentParameterUniversal.module.scss";
import { ApiConfig } from "../../config/apiConfig";

interface CurrentParameterUniversalProps {
  config: ApiConfig;
  title: string;
}

const CurrentParameterUniversal: React.FC<CurrentParameterUniversalProps> = ({ config, title }) => {
  const [data, setData] = useState(config.defaultData);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(config.apiUrl);
        if (!response.ok) throw new Error("Ошибка загрузки данных");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [config.apiUrl]);

  useEffect(() => {
    const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timeInterval);
  }, []);

  return (
    <div>
      <Header title={title} currentTime={currentTime} />
      <div className={styles.tables}>
        {Object.entries(config.titles).map(([key, tableTitle]) => (
          <div key={key}>
            <Table
              title={tableTitle}
              items={data[key] || {}}
              displayNames={config.displayNames[key] || {}}
              unit={key === "temperatures" ? "°C" : key === "vacuums" ? "кгс/м²" : ""}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentParameterUniversal;

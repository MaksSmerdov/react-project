// src/components/MnemoDryer/useMnemoDryer.ts
import { useEffect, useState } from "react";
import { apiConfigs } from "../../../config/apiConfig";

// Определяем тип ключей конфигураций
type SushilkaKey = keyof typeof apiConfigs;

// Интерфейс для конфигурации с использованием дженерика
interface Config<K extends SushilkaKey> {
  config: typeof apiConfigs[K];
}

// Определяем тип данных на основе выбранной конфигурации
type Data<K extends SushilkaKey> = typeof apiConfigs[K]['defaultData'];

const useMnemoDryer = <K extends SushilkaKey>(config: Config<K>) => {
  const [data, setData] = useState<Data<K>>(config.config.defaultData);
  const [tooltipsEnabled, setTooltipsEnabled] = useState(false); // Состояние для управления тултипами
  const [isHovered, setIsHovered] = useState(false); // Состояние для наведения

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(config.config.apiUrl);
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
  }, [config.config.apiUrl]);

  const toggleTooltips = () => {
    setTooltipsEnabled((prev) => !prev);
  };

  return {
    data,
    tooltipsEnabled,
    toggleTooltips,
    isHovered,
    setIsHovered,
  };
};

export default useMnemoDryer;

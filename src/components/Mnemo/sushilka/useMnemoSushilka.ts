import { useEffect, useState } from "react";
import { apiConfigs } from "../../../config/apiConfig";

type SushilkaKey = keyof typeof apiConfigs;

interface Config<K extends SushilkaKey> {
  config: typeof apiConfigs[K];
  dryerNumber: number;
}

type Data<K extends SushilkaKey> = typeof apiConfigs[K]["defaultData"];

const useMnemoDryer = <K extends SushilkaKey>({ config, dryerNumber }: Config<K>) => {
  const [data, setData] = useState<Data<K>>(config.defaultData);
  const [tooltipsEnabled, setTooltipsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Первоначальная загрузка данных
  const [isFirstLoad, setIsFirstLoad] = useState(true); // Для отслеживания первой загрузки
  const [animationsRunning, setAnimationsRunning] = useState(false);
  const [isGif2Visible, setIsGif2Visible] = useState(false);
  const [isGorelkaGifsVisible, setIsGorelkaGifsVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isFirstLoad) setIsLoading(true); // Показываем прелоудер только при первой загрузке
        const response = await fetch(config.apiUrl);
  
        if (!response.ok) {
          throw new Error(`Ошибка загрузки данных: ${response.status} ${response.statusText}`);
        }
  
        const result = await response.json();
        setData(result);
      } catch (error: any) {
        if (error.name === "TypeError" && error.message.includes("Failed to fetch")) {
          console.error("Ошибка: Не удалось подключиться к серверу. Проверьте подключение или URL:", config.apiUrl);
        } else {
          console.error("Ошибка загрузки данных:", error.message);
        }
      } finally {
        if (isFirstLoad) {
          setTimeout(() => {
            setIsFirstLoad(false); // Отключаем первую загрузку
            setIsLoading(false); // Прекращаем показ прелоудера
          }, 1); // Задержка 1 мс
        }
      }
    };
  
    fetchData();
    const interval = setInterval(fetchData, 5000); // Обновление данных каждые 5 секунд
    return () => clearInterval(interval);
  }, [config.apiUrl, isFirstLoad]);
  
  useEffect(() => {
    const temperature = data.temperatures?.["Температура уходящих газов"];
    const gorelkaPower = data.gorelka?.[`Мощность горелки №${dryerNumber}`];

    if (typeof temperature === "number" && temperature > 30) {
      setAnimationsRunning(true);
      setIsGif2Visible(true);
    } else {
      setAnimationsRunning(false);
      setIsGif2Visible(false);
    }

    if (typeof gorelkaPower === "number" && gorelkaPower > 5) {
      setIsGorelkaGifsVisible(true);
    } else {
      setIsGorelkaGifsVisible(false);
    }
  }, [data, dryerNumber]);

  const toggleTooltips = () => {
    setTooltipsEnabled((prev) => !prev);
  };

  return {
    data,
    isLoading, // Статус первой загрузки
    tooltipsEnabled,
    toggleTooltips,
    animationsRunning,
    isGif2Visible,
    isGorelkaGifsVisible,
  };
};

export default useMnemoDryer;
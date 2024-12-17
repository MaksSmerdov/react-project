// src/components/MnemoSushilka/MnemoSushilka.tsx

import React, { useState } from "react";
import styles from "./MnemoSushilka.module.scss";
import { apiConfigs } from "../../../config/apiConfig";
import useMnemoDryer from "./useMnemoSushilka";
import CustomModal from "../../Modal/Modal"; // Импорт нового компонента
import DocumentationAccordion from "../../Accordion/Accordion";
import { AccordionItems } from "./AccordionItems";
import Tooltip from "../../Tooltip/Tooltip";
import { TooltipItems } from "./TooltipItems";

interface MnemoDryerProps<K extends keyof typeof apiConfigs> {
  configKey: K; // Ключ конфигурации (sushilka1, sushilka2 и т.д.)
  title: string;
}

const MnemoDryer = <K extends keyof typeof apiConfigs>({ configKey, title }: MnemoDryerProps<K>) => {
  // Используем хук с выбранной конфигурацией
  const { data, tooltipsEnabled, toggleTooltips } = useMnemoDryer({
    config: apiConfigs[configKey],
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для открытия/закрытия модалки

  // Функция для получения содержимого тултипа по id
  const getTooltipContent = (tooltipId: string): React.ReactNode => {
    const tooltip = TooltipItems.find(item => item.id === tooltipId);
    return tooltip ? tooltip.content : null;
  };

  return (
    <div className={styles.mnemo}>
      <h2 className={styles.mnemo__title}>
        <span className={styles.mnemo__titleSpan}>Карбон</span> {title}
      </h2>

      {/* Кнопки для управления */}
      <div className={styles.mnemo__paramBox}>
        <button
          onClick={toggleTooltips}
          className={`${styles.btnReset} ${styles.mnemo__paramBoxBtn}`}
        >
          {tooltipsEnabled
            ? "Выключить всплывающие подсказки"
            : "Включить всплывающие подсказки"}
        </button>

        {/* Кнопка для открытия модального окна */}
        <button
          onClick={() => setIsModalOpen(true)}
          className={`${styles.btnReset} ${styles.mnemo__paramBoxBtn}`}
        >
          Документация
        </button>
      </div>

      {/* Вызов компонента модалки */}
      <CustomModal
        open={isModalOpen}
        title="Список документации"
        onClose={() => setIsModalOpen(false)}
      >
        {/* Использование нового компонента DocumentationAccordion */}
        <div className="mnemo__modal-window">
          <DocumentationAccordion items={AccordionItems} />
        </div>
      </CustomModal>

      {/* Изображение сушилки */}
      <img src="/assets/img/sushilka.jpg" alt="Сушилка" className={styles.mnemo__img} />

      {/* Текстовые подписи */}
      <div className={`${styles.mnemo__paramDescr} ${styles.kameraText}`}>
        Камера <br /> смешения
      </div>
      <div className={`${styles.mnemo__paramDescr} ${styles.gazText}`}>
        Газ природный
      </div>
      <div className={`${styles.mnemo__paramDescr} ${styles.moshGorelkiText}`}>
        Мощность <br /> горелки
      </div>
      <div className={`${styles.mnemo__paramDescr} ${styles.zadanieTemperText}`}>
        Задание <br /> температуры
      </div>
      <div className={`${styles.mnemo__paramDescr} ${styles.vozduhText}`}>
        Воздух на <br /> разбавление
      </div>
      <div className={`${styles.mnemo__paramDescr} ${styles.liniyaParotushText}`}>
        Линия паротушения
      </div>
      <div className={`${styles.mnemo__paramDescr} ${styles.barabanText}`}>
        Барабан
      </div>
      <div className={`${styles.mnemo__paramDescr} ${styles.kameraVigruzkiText}`}>
        Выгрузочная <br /> камера
      </div>
      <div className={`${styles.mnemo__paramDescr} ${styles.dymososText}`}>
        Дымосос
      </div>
      <div className={`${styles.mnemo__paramDescr} ${styles.uhodText}`}>
        Температура уходящих <br /> газов
      </div>
      <div className={`${styles.mnemo__paramDescr} ${styles.topkaText}`}>
        Топка
      </div>
      <div className={`${styles.mnemo__paramDescr} ${styles.pluzdhSbrasyvatelText}`}>
        Плужковый сбрасыватель
      </div>

      {/* Параметры - каждый в отдельном блоке */}
      <Tooltip
        tooltipId="temperaturaTopki"
        content={getTooltipContent("temperaturaTopki")}
        disabled={!tooltipsEnabled}
      >
        <div
          className={`${styles.mnemo__param} ${styles.topka_temper} ${
            tooltipsEnabled ? styles.enabledHover : ""
          }`}
        >
          <span className={styles["mnemo__param-text"]}>
            {data.temperatures["Температура в топке"] || "-"} °C
          </span>
        </div>
      </Tooltip>

      <Tooltip
        tooltipId="temperaturaKameraSmeshenia"
        content={getTooltipContent("temperaturaKameraSmeshenia")}
        disabled={!tooltipsEnabled}
      >
        <div
          className={`${styles.mnemo__param} ${styles.kamera_smeshenia} ${
            tooltipsEnabled ? styles.enabledHover : ""
          }`}
        >
          <span className={styles["mnemo__param-text"]}>
            {data.temperatures["Температура в камере смешения"] || "-"} °C
          </span>
        </div>
      </Tooltip>

      <Tooltip
        tooltipId="temperaturaUhodGazov"
        content={getTooltipContent("temperaturaUhodGazov")}
        disabled={!tooltipsEnabled}
      >
        <div
          className={`${styles.mnemo__param} ${styles.uhod_gazov} ${
            tooltipsEnabled ? styles.enabledHover : ""
          }`}
        >
          <span className={styles["mnemo__param-text"]}>
            {data.temperatures["Температура уходящих газов"] || "-"} °C
          </span>
        </div>
      </Tooltip>

      <Tooltip
        tooltipId="davlenieTopki"
        content={getTooltipContent("davlenieTopki")}
        disabled={!tooltipsEnabled}
      >
        <div
          className={`${styles.mnemo__param} ${styles.topka_davl} ${
            tooltipsEnabled ? styles.enabledHover : ""
          }`}
        >
          <span className={styles["mnemo__param-text"]}>
            {data.vacuums["Разрежение в топке"] || "-"} кг/см²
          </span>
        </div>
      </Tooltip>

      <Tooltip
        tooltipId="davlenieKameraVigruzki"
        content={getTooltipContent("davlenieKameraVigruzki")}
        disabled={!tooltipsEnabled}
      >
        <div
          className={`${styles.mnemo__param} ${styles.kamera_vigruzki} ${
            tooltipsEnabled ? styles.enabledHover : ""
          }`}
        >
          <span className={styles["mnemo__param-text"]}>
            {data.vacuums["Разрежение в камере выгрузки"] || "-"} кг/см²
          </span>
        </div>
      </Tooltip>

      <Tooltip
        tooltipId="davlenieVozduhRazbavl"
        content={getTooltipContent("davlenieVozduhRazbavl")}
        disabled={!tooltipsEnabled}
      >
        <div
          className={`${styles.mnemo__param} ${styles.vozduh_razbavl} ${
            tooltipsEnabled ? styles.enabledHover : ""
          }`}
        >
          <span className={styles["mnemo__param-text"]}>
            {data.vacuums["Разрежение воздуха на разбавление"] || "-"} кг/см²
          </span>
        </div>
      </Tooltip>

      {/* Параметры без тултипов */}
      <div className={`${styles.mnemo__param} ${styles.mosh_gorelki}`}>
        <span className={styles["mnemo__param-text"]}>
          {data.gorelka["Мощность горелки №1"] || "-"} %
        </span>
      </div>

      <div className={`${styles.mnemo__param} ${styles.zadanie_temper}`}>
        <span className={styles["mnemo__param-text"]}>
          {data.gorelka["Задание температуры №1"] || "-"} %
        </span>
      </div>
    </div>
  );
};

export default MnemoDryer;

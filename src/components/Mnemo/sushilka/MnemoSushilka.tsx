// src/components/MnemoDryer/MnemoDryer.tsx
import React, { useState } from "react";
import styles from "./MnemoSushilka.module.scss";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { apiConfigs } from "../../../config/apiConfig";
import useMnemoDryer from "./useMnemoSushilka";
import CustomModal from "../../CustomModal/CustomModal"; // Импорт нового компонента
// Импорт компонентов MUI для аккордеона
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


interface MnemoDryerProps<K extends keyof typeof apiConfigs> {
  configKey: K; // Ключ конфигурации (sushilka1, sushilka2 и т.д.)
  title: string;
}

const MnemoDryer = <K extends keyof typeof apiConfigs>({ configKey, title }: MnemoDryerProps<K>) => {
  // Используем хук с выбранной конфигурацией
  const { data, tooltipsEnabled, toggleTooltips, isHovered, setIsHovered } = useMnemoDryer({
    config: apiConfigs[configKey],
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для открытия/закрытия модалки
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>(false); // Состояние для аккордеона

  const handleAccordionChange = (panel: string) => (
    event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setExpandedAccordion(isExpanded ? panel : false);
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
        {/* Использование MUI Accordion для секций */}
        <div className="mnemo__modal-window">
          {/* Секция "Схемы проекта" */}
          <Accordion
            expanded={expandedAccordion === "schemes"}
            onChange={handleAccordionChange("schemes")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="schemes-content"
              id="schemes-header"
            >
              <strong>Схемы проекта</strong>
            </AccordionSummary>
            <AccordionDetails>
              <ul className="list-reset">
                <li className="modal__accordion-content-item">
                  <div className="modal-content__link">Общие данные</div>
                  <div className="modal-content__link-container">
                    <a
                      className="modal-content__link-download"
                      href="/production/carbon/sushilki/modal-content/schemes/common_data_sushilka.dwg"
                      download
                    >
                      Скачать DWG
                    </a>
                    <a
                      className="modal-content__link-download"
                      href="/production/carbon/sushilki/modal-content/schemes/PDF/common_data_sushilka.pdf"
                      download
                    >
                      Скачать PDF
                    </a>
                  </div>
                </li>
                <li className="modal__accordion-content-item">
                  <div className="modal-content__link">Структурная схема</div>
                  <div className="modal-content__link-container">
                    <a
                      className="modal-content__link-download"
                      href="/production/carbon/sushilki/modal-content/schemes/structural_sushilka.dwg"
                      download
                    >
                      Скачать DWG
                    </a>
                    <a
                      className="modal-content__link-download"
                      href="/production/carbon/sushilki/modal-content/schemes/PDF/structural_sushilka.pdf"
                      download
                    >
                      Скачать PDF
                    </a>
                  </div>
                </li>
                {/* Добавьте другие элементы схем по необходимости */}
              </ul>
            </AccordionDetails>
          </Accordion>

          {/* Секция "Программы" */}
          <Accordion
            expanded={expandedAccordion === "programs"}
            onChange={handleAccordionChange("programs")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="programs-content"
              id="programs-header"
            >
              <strong>Программы</strong>
            </AccordionSummary>
            <AccordionDetails>
              <ul className="list-reset">
                <li className="modal__accordion-content-item">
                  <div className="modal-content__link">Программа управления</div>
                  <div className="modal-content__link-container">
                    <a
                      className="modal-content__link-download"
                      href="/production/carbon/sushilki/modal-content/programs/control_program.exe"
                      download
                    >
                      Скачать Программу
                    </a>
                  </div>
                </li>
                {/* Добавьте другие программы по необходимости */}
              </ul>
            </AccordionDetails>
          </Accordion>
        </div>
      </CustomModal>

      {/* Изображение сушилки */}
      <img src="/assets/img/sushilka.jpg" alt="Сушилка" className={styles.mnemo__img}/>

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
      <Tippy
        className="tippy-box"
        content={
          <div className="mnemo__param-clue-content">
          Прибор: Термопара (1000мм)<br />
          Диапазон: -40...+1000&#176;C<br />
          Градуировка: ХА (К)
        </div>
        }
        placement="top"
        theme="custom"
        animation="scale"
        disabled={!tooltipsEnabled} // Отключение тултипа, если tooltipsEnabled = false
      >
        <div
          className={`${styles.mnemo__param} ${styles.topka_temper} ${
            isHovered ? styles.enabledHover : ""
          }`}
          onMouseEnter={() => {
            if (tooltipsEnabled) setIsHovered(true); // Наведение только если тултипы включены
          }}
          onMouseLeave={() => {
            if (tooltipsEnabled) setIsHovered(false); // Уход мыши только если тултипы включены
          }}
        >
          <span className={styles["mnemo__param-text"]}>
            {data.temperatures["Температура в топке"] || "-"} °C
          </span>
        </div>
      </Tippy>

      <Tippy
        className="tippy-box"
        content={
          <div className="mnemo__param-clue-content">
          Прибор: Термопара (1000мм)<br />
          Диапазон: -40...+1000&#176;C<br />
          Градуировка: ХА (К)
        </div>
        }
        placement="top"
        theme="custom"
        animation="scale"
        disabled={!tooltipsEnabled} // Отключение тултипа, если tooltipsEnabled = false
      >
        <div
          className={`${styles.mnemo__param} ${styles.kamera_smeshenia} ${
            isHovered ? styles.enabledHover : ""
          }`}
          onMouseEnter={() => {
            if (tooltipsEnabled) setIsHovered(true); // Наведение только если тултипы включены
          }}
          onMouseLeave={() => {
            if (tooltipsEnabled) setIsHovered(false); // Уход мыши только если тултипы включены
          }}
        >
          <span className={styles["mnemo__param-text"]}>
            {data.temperatures["Температура в камере смешения"] || "-"} °C
          </span>
        </div>
      </Tippy>

      <Tippy
        className="tippy-box"
        content={
          <div className="mnemo__param-clue-content">
          Прибор: Термопара (1000мм)<br />
          Диапазон: -40...+1000&#176;C<br />
          Градуировка: ХА (К)
        </div>
        }
        placement="top"
        theme="custom"
        animation="scale"
        disabled={!tooltipsEnabled} // Отключение тултипа, если tooltipsEnabled = false
      >
        <div
          className={`${styles.mnemo__param} ${styles.uhod_gazov} ${
            isHovered ? styles.enabledHover : ""
          }`}
          onMouseEnter={() => {
            if (tooltipsEnabled) setIsHovered(true); // Наведение только если тултипы включены
          }}
          onMouseLeave={() => {
            if (tooltipsEnabled) setIsHovered(false); // Уход мыши только если тултипы включены
          }}
        >
          <span className={styles["mnemo__param-text"]}>
            {data.temperatures["Температура уходящих газов"] || "-"} °C
          </span>
        </div>
      </Tippy>

      <Tippy
        className="tippy-box"
        content={
          <div className="mnemo__param-clue-content">
          Прибор: ПД-1.ТН1<br />
          Диапазон: -0,125...+0,125 кПа<br />
          Токовый выход: 4-20 мА
        </div>
        }
        placement="top"
        theme="custom"
        animation="scale"
        disabled={!tooltipsEnabled} // Отключение тултипа, если tooltipsEnabled = false
      >
        <div
          className={`${styles.mnemo__param} ${styles.topka_davl} ${
            isHovered ? styles.enabledHover : ""
          }`}
          onMouseEnter={() => {
            if (tooltipsEnabled) setIsHovered(true); // Наведение только если тултипы включены
          }}
          onMouseLeave={() => {
            if (tooltipsEnabled) setIsHovered(false); // Уход мыши только если тултипы включены
          }}
        >
          <span className={styles["mnemo__param-text"]}>
            {data.vacuums["Разрежение в топке"] || "-"} кг/см²
          </span>
        </div>
      </Tippy>

      <Tippy
        className="tippy-box"
        content={
          <div className="mnemo__param-clue-content">
          Прибор: ПД-1.ТН1<br />
          Диапазон: -0,125...+0,125 кПа<br />
          Токовый выход: 4-20 мА
        </div>
        }
        placement="top"
        theme="custom"
        animation="scale"
        disabled={!tooltipsEnabled} // Отключение тултипа, если tooltipsEnabled = false
      >
        <div
          className={`${styles.mnemo__param} ${styles.kamera_vigruzki} ${
            isHovered ? styles.enabledHover : ""
          }`}
          onMouseEnter={() => {
            if (tooltipsEnabled) setIsHovered(true); // Наведение только если тултипы включены
          }}
          onMouseLeave={() => {
            if (tooltipsEnabled) setIsHovered(false); // Уход мыши только если тултипы включены
          }}
        >
          <span className={styles["mnemo__param-text"]}>
            {data.vacuums["Разрежение в камере выгрузки"] || "-"} кг/см²
          </span>
        </div>
      </Tippy>

      <Tippy
        className="tippy-box"
        content={
          <div className="mnemo__param-clue-content">
          Прибор: ПД-1.ТН1<br />
          Диапазон: -0,125...+0,125 кПа<br />
          Токовый выход: 4-20 мА
        </div>
        }
        placement="top"
        theme="custom"
        animation="scale"
        disabled={!tooltipsEnabled} // Отключение тултипа, если tooltipsEnabled = false
      >
        <div
          className={`${styles.mnemo__param} ${styles.vozduh_razbavl} ${
            isHovered ? styles.enabledHover : ""
          }`}
          onMouseEnter={() => {
            if (tooltipsEnabled) setIsHovered(true); // Наведение только если тултипы включены
          }}
          onMouseLeave={() => {
            if (tooltipsEnabled) setIsHovered(false); // Уход мыши только если тултипы включены
          }}
        >
          <span className={styles["mnemo__param-text"]}>
            {data.vacuums["Разрежение воздуха на разбавление"] || "-"} кг/см²
          </span>
        </div>
      </Tippy>

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

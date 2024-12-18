import React, { useState } from "react";
import styles from "./MnemoSushilka.module.scss";
import { apiConfigs } from "../../../config/apiConfig";
import useMnemoDryer from "./useMnemoSushilka";
import CustomModal from "../../Modal/Modal";
import DocumentationAccordion from "../../Accordion/Accordion";
import { AccordionItems } from "./AccordionItems";
import Tooltip from "../../Tooltip/Tooltip";
import { TooltipItems } from "./TooltipItems";
import Kran from "../../Kran/KranComponent";
import Loader from "../../Preloader/Preloader";
import ControlButtons from "../../ControlButtons/ControlButtons";

interface MnemoDryerProps<K extends keyof typeof apiConfigs> {
  configKey: K;
  title: string;
  dryerNumber: number; // Новый пропс для номера сушилки
}

const MnemoDryer = <K extends keyof typeof apiConfigs>({ configKey, title, dryerNumber }: MnemoDryerProps<K>) => {
  const {
    data,
    isLoading, // Получаем статус загрузки
    tooltipsEnabled,
    toggleTooltips,
    animationsRunning,
    isGif2Visible,
    isGorelkaGifsVisible,
  } = useMnemoDryer({
    config: apiConfigs[configKey],
    dryerNumber,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Функция для получения содержимого тултипа по id
  const getTooltipContent = (tooltipId: string): React.ReactNode => {
    const tooltip = TooltipItems.find(item => item.id === tooltipId);
    return tooltip ? tooltip.content : null;
  };

  if (isLoading) {
    // Отображение прелоудера до завершения загрузки
    return (
      <Loader loading={true} size={80} />
    );
  }
  
  return (
    <div className={styles.mnemo}>
      <h2 className={styles.mnemo__title}>
        <span className={styles.mnemo__titleSpan}>Карбон</span> {title}
      </h2>

      {/* Кнопки для управления */}
      <ControlButtons
        tooltipsEnabled={tooltipsEnabled}
        onToggleTooltips={toggleTooltips}
        onOpenModal={() => setIsModalOpen(true)}
      />

      {/* Вызов компонента модалки */}
      <CustomModal
        open={isModalOpen}
        title="Список документации"
        onClose={() => setIsModalOpen(false)}
      >
        <div className="mnemo__modal-window">
          <DocumentationAccordion items={AccordionItems} />
        </div>
      </CustomModal>

      {/* Изображение сушилки */}
      <img src="/assets/img/sushilka.jpg" alt="Сушилка" className={styles["mnemo__img"]} />

      <div className={styles.mnemo__kranContainer}>
      <Kran
        size={{ width: 41, height: 40 }}
        status={Boolean(data.im?.["Индикация паротушения"])}
        orientation="vertical"
      />
      </div>
      

      {isGif2Visible && (
        <div className={`${styles["mnemo__gif"]} ${styles["mnemo__gif-2"]}`}>
          <img src="/assets/img/par.gif" alt="gif-2" />
        </div>
      )}

      <div className={`${styles["mnemo__gif"]} ${styles["mnemo__gif-3"]}`}>
        <img
          src="/assets/img/ventilator.png"
          alt="img"
          style={{
            animationPlayState: animationsRunning ? "running" : "paused",
          }}
        />
      </div>

      <div className={`${styles["mnemo__gif"]} ${styles["mnemo__gif-4"]}`}>
        <img
          src="/assets/img/ventilator.png"
          alt="img"
          style={{
            animationPlayState: animationsRunning ? "running" : "paused",
          }}
        />
      </div>

      {/* Элементы, зависящие от мощности горелки */}
      {isGorelkaGifsVisible && (
        <>
          <div className={`${styles["mnemo__gif"]} ${styles["mnemo__gif-1"]}`}>
            <img src="/assets/img/fire-gif.gif" alt="gif-1" />
          </div>
          <div className={`${styles["mnemo__gif"]} ${styles["mnemo__gif-5"]}`}>
            <img src="/assets/img/pipeline_top_coal.gif" alt="gif-5" />
          </div>
          <div className={`${styles["mnemo__gif"]} ${styles["mnemo__gif-6"]}`}>
            <img src="/assets/img/pipeline_middle_coal.gif" alt="gif-6" />
          </div>
          <div className={`${styles["mnemo__gif"]} ${styles["mnemo__gif-7"]}`}>
            <img src="/assets/img/pipeline_flow_coal.gif" alt="gif-7" />
          </div>
          <div className={`${styles["mnemo__gif"]} ${styles["mnemo__gif-8"]}`}>
            <img src="/assets/img/pipeline_middle_coal.gif" alt="gif-8" />
          </div>
        </>
      )}

      {/* Текстовые подписи */}
      <div className={`${styles["mnemo__param-descr"]} ${styles.kameraText}`}> Камера <br /> смешения </div>
      <div className={`${styles["mnemo__param-descr"]} ${styles.gazText}`}> Газ природный </div>
      <div className={`${styles["mnemo__param-descr"]} ${styles.moshGorelkiText}`}> Мощность <br /> горелки </div>
      <div className={`${styles["mnemo__param-descr"]} ${styles.zadanieTemperText}`}> Задание <br /> температуры </div>
      <div className={`${styles["mnemo__param-descr"]} ${styles.vozduhText}`}> Воздух на <br /> разбавление </div>
      <div className={`${styles["mnemo__param-descr"]} ${styles.liniyaParotushText}`}> Линия паротушения </div>
      <div className={`${styles["mnemo__param-descr"]} ${styles.barabanText}`}> Барабан </div>
      <div className={`${styles["mnemo__param-descr"]} ${styles.kameraVigruzkiText}`}> Выгрузочная <br /> камера </div>
      <div className={`${styles["mnemo__param-descr"]} ${styles.dymososText}`}> Дымосос </div>
      <div className={`${styles["mnemo__param-descr"]} ${styles.uhodText}`}> Температура уходящих <br /> газов </div>
      <div className={`${styles["mnemo__param-descr"]} ${styles.topkaText}`}> Топка </div>
      <div className={`${styles["mnemo__param-descr"]} ${styles.pluzdhSbrasyvatelText}`}> Плужковый сбрасыватель </div>

      {/* Параметры с тултипами */}
      <Tooltip
        tooltipId="temperaturaTopki"
        content={getTooltipContent("temperaturaTopki")}
        disabled={!tooltipsEnabled}
      >
        <div
          className={`${styles["mnemo__param"]} ${styles.topka_temper} ${
            tooltipsEnabled ? styles.enabledHover : ""
          }`}
        >
          <span className={styles["mnemo__param-text"]}>
            {data.temperatures?.["Температура в топке"] ?? "-"} °C
          </span>
        </div>
      </Tooltip>

      <Tooltip
        tooltipId="temperaturaKameraSmeshenia"
        content={getTooltipContent("temperaturaKameraSmeshenia")}
        disabled={!tooltipsEnabled}
      >
        <div
          className={`${styles["mnemo__param"]} ${styles.kamera_smeshenia} ${
            tooltipsEnabled ? styles.enabledHover : ""
          }`}
        >
          <span className={styles["mnemo__param-text"]}>
            {data.temperatures?.["Температура в камере смешения"] ?? "-"} °C
          </span>
        </div>
      </Tooltip>

      <Tooltip
        tooltipId="temperaturaUhodGazov"
        content={getTooltipContent("temperaturaUhodGazov")}
        disabled={!tooltipsEnabled}
      >
        <div
          className={`${styles["mnemo__param"]} ${styles.uhod_gazov} ${
            tooltipsEnabled ? styles.enabledHover : ""
          }`}
        >
          <span className={styles["mnemo__param-text"]}>
            {data.temperatures?.["Температура уходящих газов"] ?? "-"} °C
          </span>
        </div>
      </Tooltip>

      <Tooltip
        tooltipId="davlenieTopki"
        content={getTooltipContent("davlenieTopki")}
        disabled={!tooltipsEnabled}
      >
        <div
          className={`${styles["mnemo__param"]} ${styles.topka_davl} ${
            tooltipsEnabled ? styles.enabledHover : ""
          }`}
        >
          <span className={styles["mnemo__param-text"]}>
            {data.vacuums?.["Разрежение в топке"] ?? "-"} кг/см²
          </span>
        </div>
      </Tooltip>

      <Tooltip
        tooltipId="davlenieKameraVigruzki"
        content={getTooltipContent("davlenieKameraVigruzki")}
        disabled={!tooltipsEnabled}
      >
        <div
          className={`${styles["mnemo__param"]} ${styles.kamera_vigruzki} ${
            tooltipsEnabled ? styles.enabledHover : ""
          }`}
        >
          <span className={styles["mnemo__param-text"]}>
            {data.vacuums?.["Разрежение в камере выгрузки"] ?? "-"} кг/см²
          </span>
        </div>
      </Tooltip>

      <Tooltip
        tooltipId="davlenieVozduhRazbavl"
        content={getTooltipContent("davlenieVozduhRazbavl")}
        disabled={!tooltipsEnabled}
      >
        <div
          className={`${styles["mnemo__param"]} ${styles.vozduh_razbavl} ${
            tooltipsEnabled ? styles.enabledHover : ""
          }`}
        >
          <span className={styles["mnemo__param-text"]}>
            {data.vacuums?.["Разрежение воздуха на разбавление"] ?? "-"} кг/см²
          </span>
        </div>
      </Tooltip>

      {/* Параметры без тултипов */}
      <div className={`${styles["mnemo__param"]} ${styles.mosh_gorelki}`}>
        <span className={styles["mnemo__param-text"]}>
          {data.gorelka?.[`Мощность горелки №${dryerNumber}`] ?? "-"} %
        </span>
      </div>

      <div className={`${styles["mnemo__param"]} ${styles.zadanie_temper}`}>
        <span className={styles["mnemo__param-text"]}>
          {data.gorelka?.[`Задание температуры №${dryerNumber}`] ?? "-"} %
        </span>
      </div>
    </div>
  );
};

export default MnemoDryer;
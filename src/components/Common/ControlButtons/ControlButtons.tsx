import React, { useEffect, useState } from "react";
import styles from "./ControlButtons.module.scss";

interface ControlButtonsProps {
  tooltipsEnabled?: boolean;
  onToggleTooltips?: () => void;
  onOpenModal?: () => void;
  top?: string;
  left?: string; 
  adaptiveTop?: string; 
  adaptiveLeft?: string;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  tooltipsEnabled,
  onToggleTooltips,
  onOpenModal,
  top = "0", // Значение по умолчанию для стандартного экрана
  left = "0", // Значение по умолчанию для стандартного экрана
  adaptiveTop = "50px", // Значение по умолчанию для адаптивного экрана
  adaptiveLeft = "20px", // Значение по умолчанию для адаптивного экрана
}) => {
  const [position, setPosition] = useState({ top, left });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1280) {
        setPosition({ top: adaptiveTop, left: adaptiveLeft }); // Используем адаптивные значения
      } else {
        setPosition({ top, left }); // Возвращаем значения из пропсов для стандартного экрана
      }
    };

    handleResize(); // Установите начальное значение
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [top, left, adaptiveTop, adaptiveLeft]); // Добавлены новые зависимости

  return (
    <div
      className={styles.paramBox}
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      {onToggleTooltips && (
        <button
          onClick={onToggleTooltips}
          className={`${styles.btnReset} ${styles.paramBoxBtn}`}
        >
          {tooltipsEnabled
            ? "Выключить всплывающие подсказки"
            : "Включить всплывающие подсказки"}
        </button>
      )}

      {onOpenModal && (
        <button
          onClick={onOpenModal}
          className={`${styles.btnReset} ${styles.paramBoxBtn}`}
        >
          Документация
        </button>
      )}
    </div>
  );
};

export default ControlButtons;

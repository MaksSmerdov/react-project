import React from "react";
import styles from "./ControlButtons.module.scss";

interface ControlButtonsProps {
  tooltipsEnabled?: boolean;
  onToggleTooltips?: () => void;
  onOpenModal?: () => void;
  top?: string; // Динамическое положение сверху
  left?: string; // Динамическое положение слева
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  tooltipsEnabled,
  onToggleTooltips,
  onOpenModal,
  top = "0", // Значение по умолчанию
  left = "0", // Значение по умолчанию
}) => {
  return (
    <div
      className={styles.paramBox}
      style={{
        top: top, // Устанавливаем положение
        left: left,
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

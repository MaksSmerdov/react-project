import React from "react";
import styles from "./ControlButtons.module.scss";

interface ControlButtonsProps {
  tooltipsEnabled?: boolean;
  onToggleTooltips?: () => void;
  onOpenModal?: () => void;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  tooltipsEnabled,
  onToggleTooltips,
  onOpenModal,
}) => {
  return (
    <div className={styles.paramBox}>
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
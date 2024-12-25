import React, { useEffect, useState } from "react";
import styles from "./kranComponent.module.scss";

interface KranProps {
  size?: { width: number; height: number };
  status: boolean; // true для зеленого, false для красного
  orientation?: "horizontal" | "vertical"; // Ориентация крана
  top?: string; // Положение сверху для обычного экрана
  left?: string; // Положение слева для обычного экрана
  adaptiveTop?: string; // Положение сверху для адаптивного экрана
  adaptiveLeft?: string; // Положение слева для адаптивного экрана
}

const Kran: React.FC<KranProps> = ({
  size = { width: 40, height: 34 },
  status,
  orientation = "vertical", // По умолчанию вертикальный
  top = "0px",
  left = "0px",
  adaptiveTop = "50px",
  adaptiveLeft = "20px",
}) => {
  const [dynamicSize, setDynamicSize] = useState(size);
  const [position, setPosition] = useState({ top, left });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1280) {
        setDynamicSize({ width: 20, height: 20 }); // Изменение высоты и ширины при адаптиве
        setPosition({ top: adaptiveTop, left: adaptiveLeft }); // Устанавливаем адаптивные позиции
      } else {
        setDynamicSize(size); // Возврат к исходным значениям
        setPosition({ top, left }); // Возврат к исходным позициям
      }
    };

    handleResize(); // Установить начальное значение
    window.addEventListener("resize", handleResize); // Слушатель изменения размера окна

    return () => window.removeEventListener("resize", handleResize);
  }, [size, top, left, adaptiveTop, adaptiveLeft]);

  const [color, setColor] = useState<string>(status ? "green" : "red");

  useEffect(() => {
    setColor(status ? "green" : "red");
  }, [status]);

  // Стиль для ориентации
  const transformStyle =
    orientation === "horizontal" ? { transform: "rotate(90deg)" } : {};

  return (
    <div
      className={styles["mnemo__kran"]}
      style={{
        ...transformStyle,
        width: dynamicSize.width,
        height: dynamicSize.height,
        position: "absolute", // Убедитесь, что элемент позиционируется правильно
        top: position.top,
        left: position.left,
      }}
    >
      <div className={styles["mnemo__kran-box"]}>
        <div
          className={styles["mnemo__triangle1"]}
          style={{ borderLeft: `${dynamicSize.width / 2}px solid ${color}` }}
        ></div>
        <div
          className={styles["mnemo__triangle2"]}
          style={{ borderRight: `${dynamicSize.width / 2}px solid ${color}` }}
        ></div>
      </div>
    </div>
  );
};

export default Kran;

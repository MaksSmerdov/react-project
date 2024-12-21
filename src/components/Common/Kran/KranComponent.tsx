import React, { useEffect, useState } from "react";
import styles from "./KranComponent.module.scss";

interface KranProps {
  size?: { width: number; height: number };
  status: boolean; // true для зеленого, false для красного
  orientation?: "horizontal" | "vertical"; // Ориентация крана
}

const Kran: React.FC<KranProps> = ({
  size = { width: 40, height: 34 },
  status,
  orientation = "vertical", // По умолчанию вертикальный
}) => {
  const [dynamicSize, setDynamicSize] = useState(size);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1280) {
        setDynamicSize({ ...size, height: 20 }); // Изменение высоты при адаптиве
      } else {
        setDynamicSize(size); // Возврат к исходным значениям
      }
    };

    handleResize(); // Установить начальное значение
    window.addEventListener("resize", handleResize); // Слушатель изменения размера окна

    return () => window.removeEventListener("resize", handleResize);
  }, [size]);

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

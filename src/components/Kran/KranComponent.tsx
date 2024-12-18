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
  const [color, setColor] = useState<string>(status ? "green" : "red");

  useEffect(() => {
    setColor(status ? "green" : "red");
  }, [status]);

  // Задаем стиль вращения для горизонтальной ориентации
  const transformStyle =
    orientation === "horizontal" ? { transform: "rotate(90deg)" } : {};

  return (
    <div
      className={styles["mnemo__kran"]}
      style={{
        ...transformStyle, // Применяем стиль вращения
        width: size.width,
        height: size.height,
      }}
    >
      <div className={styles["mnemo__kran-box"]}>
        <div
          className={styles["mnemo__triangle1"]}
          style={{ borderLeft: `20px solid ${color}` }}
        ></div>
        <div
          className={styles["mnemo__triangle2"]}
          style={{ borderRight: `20px solid ${color}` }}
        ></div>
      </div>
    </div>
  );
};

export default Kran;
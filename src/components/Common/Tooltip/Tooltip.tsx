import React from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import styles from "./Tooltip.module.scss";

interface TooltipProps {
  tooltipId: string;
  content: React.ReactNode;
  children: React.ReactElement;
  disabled: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ tooltipId, content, children, disabled }) => {
  return (
    <Tippy
      className={styles["tippy-box"]}
      content={content}
      placement="top"
      theme="custom"
      animation="shift-away"
      disabled={disabled}
    >
      {children}
    </Tippy>
  );
};

export default Tooltip;

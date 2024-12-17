import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Иконка крестика
import styles from "./Modal.module.scss";

interface CustomModalProps {
  open: boolean; // Состояние открытия/закрытия модалки
  title: string; // Заголовок модального окна
  children: React.ReactNode; // Контент модалки
  onClose: () => void; // Функция для закрытия модалки
}

const CustomModal: React.FC<CustomModalProps> = ({ open, title, children, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: styles.modalPaper }}>
      {/* Заголовок и кнопка закрытия */}
      <DialogTitle className={styles.modalTitle}>
        <span className={styles.modalTitleText}>{title}</span>
        <IconButton
          aria-label="close"
          onClick={onClose}
          className={styles.closeButton}
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Контент модального окна */}
      <DialogContent>{children}</DialogContent>

      {/* Опционально: можно убрать или добавить действия */}
      <DialogActions></DialogActions>
    </Dialog>
  );
};

export default CustomModal;

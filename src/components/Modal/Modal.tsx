import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./Modal.module.scss";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

interface CustomModalProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ open, title, children, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      classes={{ paper: styles.modalPaper }}
    >
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
      <DialogContent>{children}</DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

export default CustomModal;
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Stepper from "./Stepper";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: 400,
  width: 410,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  margin: "auto",
  borderRadius: 2,
};

type Props = {
  open: boolean;
  handleClose: () => void;
};

const AppModal: React.FC<Props> = ({ open, handleClose }: Props) => {
  return (
    <Modal
      className="app-modal"
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Stepper />
        </Typography>
      </Box>
    </Modal>
  );
};

export default React.memo(AppModal);

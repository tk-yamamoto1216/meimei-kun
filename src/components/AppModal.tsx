import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "60%",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
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
        <Typography id="modal-modal-title" variant="h6" component="h2">
          使い方
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          見て学べ
        </Typography>
      </Box>
    </Modal>
  );
};

export default React.memo(AppModal);

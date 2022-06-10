import { memo } from "react";
import AppBar from "@mui/material/AppBar";
import { Box, Button, Toolbar, Typography } from "@mui/material";

type Props = {
  handleOpen: () => void;
};

const AppHeader = ({ handleOpen }: Props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <img
            className="logo"
            src={`${process.env.REACT_APP_URL}/meimei_logo.png`}
            alt={"logo"}
          />
          {/* 後で直す */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <Button onClick={() => handleOpen()} color="inherit">
            使い方
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default memo(AppHeader);

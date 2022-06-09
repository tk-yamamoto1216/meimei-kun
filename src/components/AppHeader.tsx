import React, { memo } from "react";
import AppBar from "@mui/material/AppBar";
import { Container, Toolbar } from "@mui/material";

const AppHeader = () => {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img
              className="logo"
              src={`${process.env.REACT_APP_URL}/meimei_logo.png`}
              alt={"logo"}
            />
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default memo(AppHeader);

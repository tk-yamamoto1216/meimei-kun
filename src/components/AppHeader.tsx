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
              src={"http://localhost:3001/meimeiロゴ2.PNG"}
              alt={"logo"}
            />
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default memo(AppHeader);

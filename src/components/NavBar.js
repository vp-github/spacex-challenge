import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const style = {
  margin: "auto",
};
const Navbar = () => {
  return (
    <AppBar position="static" color="transparent" elevation={2}>
      <Toolbar style={style}>
        <img src="spacelogo.png" width="250"></img>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;

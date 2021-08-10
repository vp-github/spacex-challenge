import React from "react";
import { CircularProgress, TableRow, TableCell } from "@material-ui/core";
import "./Loader.css";
const Loader = () => {
  return (
    <div className="wrapper">
      <CircularProgress
        variant="indeterminate"
        color="primary"
      ></CircularProgress>
    </div>
  );
};

export default Loader;

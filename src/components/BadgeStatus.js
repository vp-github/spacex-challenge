import React from "react";
import { Badge } from "@material-ui/core";
import "./BadgeStatus.css";

const BadgeStatus = (props) => {
  return (
    <Badge
      className={
        props.launch.upcoming
          ? "upcomingClass"
          : props.launch.launch_success
          ? "successClass"
          : "failureClass"
      }
      badgeContent={
        props.launch.upcoming
          ? "Upcoming"
          : props.launch.launch_success
          ? "Success"
          : "Failure"
      }
    ></Badge>
  );
};
export default BadgeStatus;

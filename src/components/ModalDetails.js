import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import "./ModalDetails.css";
import BadgeStatus from "./BadgeStatus";
import {
  List,
  ListItem,
  Divider,
  TableCell,
  Table,
  TableRow,
} from "@material-ui/core";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        onClose={props.closeModal}
        aria-labelledby="customized-dialog-title"
        open={props.openValue}
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle onClose={props.closeModal}>
          <div className="titleDiv">
            <div className="imgDiv">
              <img
                src={props.launchId.links.mission_patch_small}
                className="imageClass"
              ></img>
            </div>
            <div className="dispDiv">
              <div className="namingDiv">
                <Typography variant="h5">
                  <b>{props.launchId.mission_name}. &nbsp;</b>
                </Typography>
                <Typography>{props.launchId.rocket.rocket_name}</Typography>
              </div>
              <div className="iconDiv">
                <a
                  href={props.launchId.links.article_link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img className="nasaIcon" src="image 2.svg" />
                </a>
                <a
                  href={props.launchId.links.wikipedia}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img className="wikiIcon" src="image 3.svg" />
                </a>
                <a
                  href={props.launchId.links.video_link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img className="youIcon" src="image 4.svg" />
                </a>
              </div>
            </div>
            <div className="badgeDiv">
              <BadgeStatus launch={props.launchId} />
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <div>
            <Typography>
              {props.launchId.details}
              <span>
                <a
                  className="wikiFont"
                  href={props.launchId.links.wikipedia}
                  target="_blank"
                >
                  &nbsp;Wikipedia
                </a>
              </span>
            </Typography>
            <div className="listClass">
              <Table className="listClass">
                <TableRow className="listitemClass">
                  <TableCell>Flight Number &nbsp; </TableCell>
                  <TableCell>{props.launchId.flight_number}</TableCell>
                </TableRow>
                <TableRow className="listitemClass">
                  <TableCell> Mission Type &nbsp;</TableCell>
                  <TableCell>{props.launchId.mission_name}</TableCell>
                </TableRow>
                <TableRow className="listitemClass">
                  <TableCell>Rocket Type &nbsp; </TableCell>
                  <TableCell> {props.launchId.rocket.rocket_type}</TableCell>
                </TableRow>
                <TableRow className="listitemClass">
                  <TableCell>Rocket Name </TableCell>
                  <TableCell>{props.launchId.rocket.rocket_name}</TableCell>
                </TableRow>
                <Divider />
                <TableRow className="listitemClass">
                  <TableCell>Manufacturer &nbsp;</TableCell>
                  <TableCell>
                    {
                      props.launchId.rocket.second_stage.payloads[0]
                        .manufacturer
                    }
                  </TableCell>
                </TableRow>
                <TableRow className="listitemClass">
                  <TableCell> Nationality &nbsp;</TableCell>
                  <TableCell>
                    {props.launchId.rocket.second_stage.payloads[0].nationality}
                  </TableCell>
                </TableRow>
                <TableRow className="listitemClass">
                  <TableCell>Launch Date &nbsp;</TableCell>
                  <TableCell>{props.launchId.launch_date_local}</TableCell>
                </TableRow>
                <TableRow className="listitemClass">
                  <TableCell>Payload Type &nbsp;</TableCell>
                  <TableCell>
                    {
                      props.launchId.rocket.second_stage.payloads[0]
                        .payload_type
                    }
                  </TableCell>
                </TableRow>
                <TableRow className="listitemClass">
                  <TableCell> Orbit </TableCell>
                  <TableCell>
                    {props.launchId.rocket.second_stage.payloads[0].orbit}
                  </TableCell>
                </TableRow>
                <TableRow className="listitemClass">
                  <TableCell> Launch Site ;</TableCell>
                  <TableCell>{props.launchId.launch_site.site_name}</TableCell>
                </TableRow>
              </Table>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

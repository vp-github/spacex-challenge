import React from "react";
import {
  FormControl,
  Container,
  MenuItem,
  Select,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Tab,
} from "@material-ui/core";
import "./LaunchList.css";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";
import { useEffect, useState } from "react";
import BadgeStatus from "./BadgeStatus";
import ModalDetails from "../components/ModalDetails";
import Loader from "./Loader";

const LaunchList = () => {
  const [launches, setLaunches] = useState([]);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [launchId, setLaunchId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    fetchAllLaunches();
  }, []);

  const fetchAllLaunches = () => {
    setLoading(true);
    setHasError(false);
    axios
      .get("https://api.spacexdata.com/v3/launches")
      .then((response) => {
        setLaunches(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setLaunches([]);
        setLoading(false);
        setHasError(true);
      });
  };

  const setUpcoming = () => {
    setLoading(true);
    setHasError(false);
    axios
      .get("https://api.spacexdata.com/v3/launches")
      .then((response) => {
        const filtered = response.data.filter((i) => i.upcoming === true);
        setLaunches(filtered);
        setPage(1);
        setLoading(false);
      })
      .catch((err) => {
        setLaunches([]);
        setLoading(false);
        setHasError(true);
      });
  };
  const setSuccess = () => {
    setLoading(true);
    setHasError(false);
    axios
      .get("https://api.spacexdata.com/v3/launches")
      .then((response) => {
        const filtered = response.data.filter((i) => i.launch_success === true);
        setLaunches(filtered);
        setPage(1);
        setLoading(false);
      })
      .catch((err) => {
        setLaunches([]);
        setLoading(false);
        setHasError();
      });
  };
  const setFailure = () => {
    setLoading(true);
    setHasError(false);
    axios
      .get("https://api.spacexdata.com/v3/launches")
      .then((response) => {
        const filtered = response.data.filter(
          (i) => i.launch_success === false
        );
        setLaunches(filtered);
        setPage(1);
        setLoading(false);
      })
      .catch((err) => {
        setLaunches([]);
        setLoading(false);
        setHasError(true);
      });
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const openModal = (event) => {
    setOpen(true);
    setLaunchId(event);
  };
  const closeModal = () => {
    setOpen(false);
  };
  return (
    <Container className="containerClass">
      <FormControl className="formClass">
        <Select
          defaultValue="All Launches"
          className="dropdownClass"
          variant="outlined"
        >
          <MenuItem value="All Launches" onClick={fetchAllLaunches}>
            All Launches
          </MenuItem>
          <MenuItem value="Upcoming Launches" onClick={setUpcoming}>
            Upcoming Launches
          </MenuItem>
          <MenuItem value="Successful Launches" onClick={setSuccess}>
            Successful Launches
          </MenuItem>
          <MenuItem value="Failure Launches" onClick={setFailure}>
            Failure Launches
          </MenuItem>
        </Select>
      </FormControl>
      <Table className="tableClass">
        <TableHead className="tableHeadClass">
          <TableCell>No:</TableCell>
          <TableCell>Launched (UTC)</TableCell>
          <TableCell>Location</TableCell>
          <TableCell>Mission</TableCell>
          <TableCell>Orbit</TableCell>
          <TableCell>Launch Status</TableCell>
          <TableCell>Rocket</TableCell>
        </TableHead>
        {launchId !== null ? (
          <ModalDetails
            openValue={open}
            closeModal={closeModal}
            launchId={launchId}
          />
        ) : null}
        <TableBody className="tableBodyClass">
          {loading ? (
            <TableRow>
              <TableCell colSpan={7}>
                <Loader />
              </TableCell>
            </TableRow>
          ) : launches.length !== 0 ? (
            launches
              .slice((page - 1) * 12, (page - 1) * 12 + 12)
              .map((launch) => (
                <TableRow
                  hover={true}
                  onClick={() => openModal(launch)}
                  className="rowClass"
                >
                  <TableCell>{launch.flight_number}</TableCell>
                  <TableCell>{launch.launch_date_utc}</TableCell>
                  <TableCell>{launch.launch_site.site_name}</TableCell>
                  <TableCell>{launch.mission_name}</TableCell>
                  <TableCell>
                    {launch.rocket.second_stage.payloads[0].orbit}
                  </TableCell>
                  <TableCell className="badgeClass">
                    <BadgeStatus launch={launch} />
                  </TableCell>
                  <TableCell>{launch.rocket.rocket_name}</TableCell>
                </TableRow>
              ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="errorMessage">
                {hasError
                  ? "Something went wrong! Please Try Again."
                  : "No results found for the specified filter"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination
        count={Math.ceil(launches.length / 12)}
        rowsPerPage={12}
        page={page}
        onChange={handleChangePage}
        rowsPerPageOptions={[]}
        variant="outlined"
        shape="rounded"
        className="pagination"
      />
    </Container>
  );
};
export default LaunchList;

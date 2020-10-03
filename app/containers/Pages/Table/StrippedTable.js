import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import styles from "dan-components/Tables/tableStyle-jss";

function StrippedTable(props) {
  const { classes } = props;

  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    const id = setInterval(() => {
      getWeatherWithFetch();
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const getWeatherWithFetch = async () => {
    const response = await fetch(
      "https://iot4cast.000webhostapp.com/api/weather/read_all.php"
    );
    const jsonData = await response.json();
    setWeatherData(jsonData);
  };

  return (
    <Fragment>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          <Typography className={classes.title} variant="h6">
            Summary
          </Typography>
        </div>
      </Toolbar>
      <div className={classes.rootTable}>
        <Table className={classNames(classes.table, classes.stripped)}>
          <TableHead>
            <TableRow>
              <TableCell padding="default">Date</TableCell>
              <TableCell align="right">Temperature (°C)</TableCell>
              <TableCell align="right">Humidity</TableCell>
              <TableCell align="right">Pressure (Pa)</TableCell>
              <TableCell align="right">Ambient Light (LUX)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {weatherData.weather &&
              weatherData.weather.map((n) => [
                <TableRow key={n.id}>
                  <TableCell padding="default">{n.date}</TableCell>
                  <TableCell align="right">{n.temp}</TableCell>
                  <TableCell align="right">{n.humidity}</TableCell>
                  <TableCell align="right">{n.pressure}</TableCell>
                </TableRow>,
              ])}
          </TableBody>
        </Table>
      </div>
    </Fragment>
  );
}

StrippedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StrippedTable);


import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../app/context/index';
import useApiData from '../../api/useApiData';

//#region MUI Imports
import { makeStyles } from "@material-ui/core/styles";
//import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import useProgressBar from '../../api/useProgressBar';

const myStyles = makeStyles(theme => ({
  absolute: {
    //position: 'absolute',
    //bottom: 0,
  },
  table: {
    minWidth: 650,
  },
}));
//#endregion

export default function MuiTables() {
  const { appState, } = useContext(AppContext);
  const myClasses = myStyles();
  const { apiData: desertsData, apiError, refreshData: refreshDeserts } = useApiData('deserts');
  const { progress, startProgress } = useProgressBar();
  
  useEffect(() => {
    appState.connectView('muitables', (action) => {
      // respond to action callback
      console.log('muitables-view-action', [action]);
    })
  }, );
  useEffect(() => {
    if (apiError) alert('request for data failed.. see console');
  }, [apiError] );
    
  //#region > event handlers
  const handleRefreshDataClick = (e) => {
    startProgress();
    refreshDeserts();
  }
  //#endregion

  const codeString = '{ apiData:desertsData, refreshData:refreshDeserts }';
  return (
    <div>
      <h1>Demonstrating MUI Data Tables</h1>

      <Box mb={3}>
        <Alert severity="success">
          <AlertTitle>Data Tables</AlertTitle>
          Tables display sets of data. They can be fully customized. <a href="https://material-ui.com/components/tables/">Read more</a>
        </Alert>
      </Box>

      <Grid container>
        <Grid item xs={10}>
          <h3>Simple MUI Table</h3>
        </Grid>
        <Grid item xs={2} style={{textAlign: "right"}}>
          <Button onClick={handleRefreshDataClick} look="flat" style={{textTransform:'lowercase'}}>refresh-data from server</Button>
        </Grid>
      </Grid>
      
      { progress !== 100 && (<LinearProgress variant="determinate" value={progress} />)}
      <TableContainer component={Paper}>
        <Table className={myClasses.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          { (desertsData != null && progress === 100) &&
            (desertsData.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
              </TableRow>
            )))
          }
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={2}>
        <Grid container>
          <Grid item xs={12}>
            <h3>Server data is accessed by an app-wide hook that gets (and refreshes) data, logs errors and optionally cache's data on the client.</h3>
            <Box mt={3}>
              <Paper style={{padding:5}}>
                <pre>
                  <code>
                    &nbsp;&nbsp;&nbsp;&nbsp;const { codeString } = useApiData('deserts');
                  </code>
                </pre>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>              
      
      <Box mt={4} className={myClasses.absolute}>
        <Alert severity="success">
          <AlertTitle>App-Wide Alerts</AlertTitle>
            Notice the bell icon in the app menu at the top of the page. When a notification is pending your view and action, it will show a ###.
             Clicking that icon will present a dialog offering you context and possible actions that you may want to do. Notifications can be internally 
            generated or they may come from the server.
        </Alert>
      </Box>
    </div>
  );
}

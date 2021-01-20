
import React, { useContext, useEffect } from 'react';
import AppContext from '../../app/context/index';

//#region MUI Imports
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
//import Typography from '@material-ui/core/Typography';
//import Button from '@material-ui/core/Button';
//import Grid from "@material-ui/core/Grid";

const myStyles = makeStyles(theme => ({
  absolute: {
    //position: 'absolute',
    //bottom: 60,
  }
}));
//#endregion

export default function MuiForms() {
  const { appState,  } = useContext(AppContext);
  const myClasses = myStyles();

  useEffect(() => {
    appState.connectView('muiforms', (action) => {
      console.log('muiforms-view-action', [action]);
    })
  },);

  return (
    <div>
      <h1>Demonstrating MUI Form Presentation</h1>

      <Alert severity="success">
        <AlertTitle>Forms in MUI</AlertTitle>
        Forms allow for data input. They can be fully customized. <a href="https://material-ui.com/components/text-fields/#components">Read more</a>
      </Alert>

      <Box mt={10} className={myClasses.absolute}>
        <Alert severity="success">
          <AlertTitle>App-Wide Alerts</AlertTitle>
            Notice the bell icon in the app menu at the top of the page. When an notification is pending your view and action, it will show a ###.
             Clicking that icon will present a dialog offering you context and possible actions that you may want to do. Notifications can be internally 
            generated or they may come from the server.
        </Alert>
      </Box>
    </div>
  );
}

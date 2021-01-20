
import React, { useContext, useEffect } from 'react';
import AppContext from '../../app/context/index';

//#region MUI Imports
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

const myStyles = makeStyles(theme => ({
  absolute: {
    //position: 'absolute',
    //bottom: 60,
  }
}));

//#endregion

export default function MuiGrids() {
  const { appState,  } = useContext(AppContext);
  const myClasses = myStyles();

  useEffect(() => {
    appState.connectView('muigrids', (action) => {
      console.log('muigrids-view-action', [action]);
    })
},);

  return (
    <div>
      <h1>Demonstrating MUI Grid Model</h1>

      <Alert severity="success">
        <AlertTitle>Responsive Layout Grid</AlertTitle>
        The <a href="https://material-ui.com/components/grid/">MUI</a>&nbsp;
        grid creates visual consistency between layouts while allowing flexibility across a wide variety of device sizes. Material Design’s responsive UI is based on a 12-column grid layout. 
        Apart from being responsive, the <strong>GRID</strong> layout makes it easy to layout a view where things can line up consistantly across various elements on the page.
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

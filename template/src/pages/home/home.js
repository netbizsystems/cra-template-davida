
import React, { useEffect, useContext } from 'react';
import AppContext from '../../app/context';

//#region > MUI Imports
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

const myStyles = makeStyles(theme => ({
  root: {
  },
  demoButton: {
    width: 400,
  },
  absolute: {
    //position: 'absolute',
    //bottom: 60,
  }
}));
//#endregion

export default function Home( /* look no props */ ) {
  const { appState, } = useContext(AppContext);
  const myClasses = myStyles();

  useEffect(() => {
    appState.connectView('home', (action) => {
      console.log('home-view-action', [action]);
    })
},);

  //#region > event handlers
  const handleButtonClick = (type) => {
    if (appState.showAlert) {
      appState.showAlert('Material UI has lots and lots of options for dialog and alert presentation', 
      () => {
        //callback action
      }, type)
    };    
  }
  //#endregion
  
  return (
    <Box className={myClasses.root}>
      <h1>DavidA Demo App</h1>
      <Typography component="div">
        <Box>
          <Alert style={{}} severity="success">
            <AlertTitle>Create React App</AlertTitle>
            This app was built using an <strong>NPM</strong> package that implements a <a href="https://create-react-app.dev/">Create React App</a>
            &nbsp;with a custom <a href="https://create-react-app.dev/docs/custom-templates">template</a> named 
            <a href="https://www.npmjs.com/package/cra-template-redux"> <strong>DavidA</strong></a>. I (or you) can use this as a starting point for an app that I might want to build; 
            maybe an app for you? I'm always game for something new and fun!
          </Alert>
        </Box>
      </Typography>
      <Box component="hr" mt={5} mb={3}></Box>

      <Grid container>
        <Grid item xs={12}>
          <h2>This button demonstrates the app-wide <mark>alerting</mark> API</h2>
          <p>Alerts and Dialogs are based on builtin MUI capibilities and have been implemented in this apps framework in a way that makes it drop-dead simple to use anywhere in the app (including right here).</p>
          <Button className={myClasses.demoButton} onClick={() => { handleButtonClick('box') }} variant="contained">Show ALERT Message...</Button>
          <Box mt={3}>
            <Paper style={{padding:5}}>
              <pre>
                <code>
                  &nbsp;&nbsp;&nbsp;&nbsp;appState.showMessage('Material UI has lots and lots of options for dialog and alert presentation', callBack, 'alert');
                </code>
              </pre>
            </Paper>
          </Box>
        </Grid>
      </Grid>
      <Box component="div" mb={10}></Box>

      <Grid container>
        <Grid item xs={12}>
          <h2>This button demonstrates the app-wide <mark>dialog</mark> API</h2>
          <Button className={myClasses.demoButton} onClick={() => { handleButtonClick('dialog') }} variant="contained">Show DIALOG Message</Button>
          <Box mt={3}>
            <Paper style={{padding:5}}>
              <pre>
                <code>
                  &nbsp;&nbsp;&nbsp;&nbsp;appState.showMessage('Material UI has lots and lots of options for dialog and alert presentation', callBack, 'dialog');
                </code>
              </pre>
            </Paper>
          </Box>
        </Grid>
      </Grid>

      <Box mt={6} className={myClasses.absolute}>
        <Alert severity="success">
          <AlertTitle>Views and Actions</AlertTitle>
            In the drawer on the left you will see <strong>Views</strong> and <strong>Actions</strong>. Clicking a <strong>View</strong> will navigate to the
            route that implments that view. <strong>Actions</strong> on the other-hand will carry out view-specific use-case stuff on the page. Rather than clutter up your
            views with lots of little used buttons and such, prefer implmenting them off screen as an action. This is especially important when scaling down
            to a smaller device with less room. Some of these actions are common and can be used in any view. Some are specific to this view.
        </Alert>
      </Box>

    </Box>    
  );
}

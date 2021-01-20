
import React, { useState, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AppContext from '../../app/context/index';
import { decrement, increment, incrementByAmount, incrementAsync, selectCount, } from './aboutSlice';
import styles from './about.module.css';

//#region MUI Imports
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

const myStyles = makeStyles(theme => ({
  alertStyle: {
    marginTop: 5
  },
  absolute: {
    //position: 'absolute',
    //bottom: 60,
  }
}));
//#endregion

export default function About() {
  const { appState,  } = useContext(AppContext);
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  useEffect(() => {
    appState.connectView('about', (action) => {
      console.log('about-view-action', [action]);
    })
  },[appState]);

  const myClasses = myStyles();
  return (
    <Box>
      <h1>DavidA Demo About</h1>

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

      <Grid container>
        <Grid item xs={3}><h2>About</h2></Grid>
        <Grid item xs={3}><h3>About</h3></Grid>
        <Grid item xs={3}><h4>About</h4></Grid>
        <Grid item xs={3}><h5>About</h5></Grid>
      </Grid>

      <Alert severity="info" className={myClasses.alertStyle}>Redux all the way. AppContext is good too.. I use it for crosscutting-concerns.</Alert>
      <Alert severity="info" className={myClasses.alertStyle}>ReduxToolkit too.. must have slices.</Alert>
      <Alert severity="info" className={myClasses.alertStyle}>Opinionated app design... all (mostly) mine! Make it work, make it right, make it fast and make it tight.</Alert>
      <Alert severity="info" className={myClasses.alertStyle}>MUI rocks; this is a Kendo-free zone. Don't fight the framework. Have fun!!</Alert>

      <Box border={1} p={2} m={2}>
        <Grid container>
          <Grid item xs={12}>
          <div className={styles.row}>
            <button
              className={styles.button}
              aria-label="Increment value"
              onClick={() => dispatch(increment())}
            >
              +
            </button>
            <span className={styles.value}>{count}</span>
            <button
              className={styles.button}
              aria-label="Decrement value"
              onClick={() => dispatch(decrement())}
            >
              -
            </button>
          </div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
          <div className={styles.row}>
            <input
              className={styles.textbox}
              aria-label="Set increment amount"
              value={incrementAmount}
              onChange={e => setIncrementAmount(e.target.value)}
            />
            <button
              className={styles.button}
              onClick={() =>
                dispatch(incrementByAmount(Number(incrementAmount) || 0))
              }
            >
              Add Amount
            </button>
            <button
              className={styles.asyncButton}
              onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
            >
              Add Async
            </button>
          </div>
          </Grid>
        </Grid>
      </Box>

      <Box mt={10} className={myClasses.absolute}>
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

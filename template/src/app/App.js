
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";

import AppContext from './context/index';
import useApiData from '../api/useApiData';
import Home from "../pages/home/home";
import MuiGrids from "../pages/MuiGrids/mui-grids";
import MuiForms from "../pages/MuiForms/mui-forms";
import MuiTables from "../pages/MuiTables/mui-tables";
import About from "../pages/about/about";
import SettingsDrawer from "./SettingsDrawer";
import AppDialog from "./AppDialog";
import NotificationsDialog from "./NotificationsDialog";
import { globalValue, } from './globalSlice';

//#region > MUI imports & styles
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import NotificationsIcon from '@material-ui/icons/Notifications';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import InboxIcon from "@material-ui/icons/MoveToInbox";
import GridOnIcon from '@material-ui/icons/GridOn';
import ListAltIcon from '@material-ui/icons/ListAlt';
import SettingsIcon from '@material-ui/icons/Settings';
import StorageIcon from '@material-ui/icons/Storage';
import InfoIcon from '@material-ui/icons/Info';
import HomeWorkIcon from '@material-ui/icons/HomeWork';

const drawerWidth = 175;
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    // marginLeft: drawerWidth,
    // [theme.breakpoints.up("sm")]: {
    //   width: `calc(100% - ${drawerWidth}px)`
    // }
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
},
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    // marginRight: theme.spacing(2),
    // [theme.breakpoints.up("sm")]: {
    //   display: "none"
    // }
    marginRight: 36,
},
  menuButtonHidden: {
    display: 'none',
  },
  toolbar: theme.mixins.toolbar,
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  linkUnderline: {
    textDecoration: 'underline',
  },
  drawerPaper: {
    //width: drawerWidth
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  footer: {
    padding: theme.spacing(2, 0),
    marginTop: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    //backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    width: '100%', 
    position: 'fixed', 
    bottom: 0
  },
}));
//#endregion 

const App = () => {
  console.log('app-starting', [useSelector(globalValue)]);
  const classes = useStyles();
  const [isSettingOpen, setIsSettingOpen] = React.useState(false);
  const { appState, setAppState  } = useContext(AppContext);
  const { apiData: resourcesData } = useApiData('/resources');
  const { apiData: profileData } = useApiData('/profile');
  
  useEffect(() => {  
    // initialize app-context with cross-cutting concerns
    appState.profileData = profileData;
    appState.resourcesData = resourcesData;
    appState.showAlert = appDialogRequest;
    appState.isReady = true;
    setAppState(appState);
  },);
  
  //#region > dark/light mode
  const [darkState, setDarkState] = useState(false);
  const palletType = !darkState ? "dark" : "light";
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
    }
  });
  const handleThemeChange = () => {
    setDarkState(!darkState);
  };
  //#endregion
  //#region > left-side navagation drawer
  const [drawerState, setDrawerState] = React.useState(true); 
  const [selectedIndex, setSelectedIndex] = React.useState(0); 
  const handleDrawerOpen = () => { setDrawerState(true); };
  const handleDrawerClose = () => { setDrawerState(false); };
  const handleActionClick = (action) => {
    setToastOpen(true);
    appState.views[appState.activeViewX].callBack(action);
  }
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const drawer = (
    <div>
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />

      <Box pl={2} pb={0} mt={1} visibility="visible">
        <span>Views</span>
      </Box>
      <List className={classes.linkUnderline}>
        <ListItem
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
          key={'home'}
          component={Link}
          to={"/home"}
        >
          <ListItemIcon>
            <HomeWorkIcon />
          </ListItemIcon>
          <ListItemText primary={'Home'} />
        </ListItem>
        <ListItem
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
          key={'muigrids'}
          component={Link}
          to={"/muigrids"}
        >
          <ListItemIcon>
            <GridOnIcon />
          </ListItemIcon>
          <ListItemText primary={'Grid'} />
        </ListItem>
        <ListItem
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
          key={'muiforms'}
          component={Link}
          to={"/muiforms"}
        >
          <ListItemIcon>
            <ListAltIcon />
          </ListItemIcon>
          <ListItemText primary={'Forms'} />
        </ListItem>
        <ListItem
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
          key={'muitables'}
          component={Link}
          to={"/muitables"}
        >
          <ListItemIcon>
            <StorageIcon />
          </ListItemIcon>
          <ListItemText primary={'Tables'} />
        </ListItem>
        <ListItem 
          selected={selectedIndex === 4}
          onClick={(event) => handleListItemClick(event, 4)}
          key={'about'}
          component={Link}
          to={"/about"}
        >
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary={'About'} />
        </ListItem>
      </List>
      
      <Divider />
      
      <Box pl={2} pb={0} mt={1} visibility="visible">
        <span>Actions</span>
      </Box>
      <List>
        {['ToDo','ZeroCalc','DoIt','LogIssue'].map((text, index) => (
          <ListItem button key={text} onClick={handleActionClick}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>                 

    </div>
  );
  //#endregion
  //#region > common app-wide dialog
  const [showAlertDialog, setShowAlertDialog] = React.useState(false);
  const [showAlertBox, setShowAlertBox] = React.useState(false);
  const [appDialogCallback, setAppDialogCallback] = React.useState(null);
  const [appDialogText, setAppDialogText] = React.useState('');
  const appDialogRequest = (alertText, callBack, style) => {
    setAppDialogCallback({callBack});
    setAppDialogText(alertText);
    if (style === 'box') {
      setShowAlertBox(true);
    } else {
      setShowAlertDialog(true);
    }
  }
  const handleAppDialogClose = (e) => {
    setShowAlertDialog(false);
    if (appDialogCallback) {
      appDialogCallback.callBack(); // inform caller
    }
  }
  //#endregion
  //#region > app-wide toast
  const [toastOpen, setToastOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setToastOpen(false);
  }; 
  
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }  
  //#endregion
  //#region > event handlers
  //#endregion
  //#region > common notification dialog
  const [showNotificationsDialog, setShowNotificationsDialog] = React.useState(false);
  const handleNotificationAlertClick = (alertText, callBack, style) => {
    setShowNotificationsDialog(true);
  }
  const handleNotificationClose = (e) => {
    setShowNotificationsDialog(false);
  }
  //#endregion

  //const foo = useSelector(globalValue);
  //console.log('app starting',[foo]);

  return (
    <div className={classes.root}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        {/* app-settings on right side */}
        <SettingsDrawer open={isSettingOpen} close={() => {setIsSettingOpen(!isSettingOpen)}} />    
        
        <AppBar position="absolute" className={clsx(classes.appBar, drawerState && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <Box pt={2} width="100%" border={0}>
              <Grid container>              
                  <Grid item xs={8} style={{textAlign: "left"}}>
                    <IconButton
                      edge="start"
                      color="inherit"
                      aria-label="open drawer"
                      onClick={handleDrawerOpen}
                      className={clsx(classes.menuButton, drawerState && classes.menuButtonHidden)}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>DavidA Demo App</Typography>
                  </Grid>              
                  <Grid item xs={4} style={{textAlign: "right"}}>
                    <Box mt={-1}>
                      <IconButton color="inherit" onClick={handleThemeChange}>
                        <Brightness4Icon />
                      </IconButton>
                      <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary" onClick={handleNotificationAlertClick}>
                          <NotificationsIcon />
                        </Badge>
                      </IconButton>                    
                      <IconButton color="inherit" onClick={() => {setIsSettingOpen(!isSettingOpen)}}>
                        <SettingsIcon />
                      </IconButton>
                    </Box>
                  </Grid>
              </Grid>
            </Box>
          </Toolbar>        
        </AppBar>
        <BrowserRouter>
          <Drawer classes={{ paper: clsx(classes.drawerPaper, !drawerState && classes.drawerPaperClose), }} variant="permanent" open={drawerState} >
            {drawer}
          </Drawer>
          <main className={classes.content}>
          <div className={classes.toolbar} />
          <Box mt={showAlertBox ? 0 : -10}>
            <Grid container>
              <Grid item xs={12}>
                <Alert onClose={() => {setShowAlertBox(false)}} severity="error">{appDialogText}&nbsp;&nbsp;<a href="https://material-ui.com/components/dialogs/">read here</a></Alert>
              </Grid>
            </Grid>
          </Box>
          
          <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/home">
                <Home />
            </Route>
            <Route exact path="/muigrids">
                <MuiGrids />
            </Route>
            <Route exact path="/muiforms">
                <MuiForms />
            </Route>
            <Route exact path="/muitables">
                <MuiTables />
            </Route>
            <Route exact path="/about">
                <About />
            </Route>
          </Switch>
          
          <footer className={classes.footer}>
            <Typography variant="h5">
              <b><Copyright /></b>
            </Typography>
        </footer>
        </main>
        </BrowserRouter>

        {/* common app-wide dialog */}
        <AppDialog open={showAlertDialog} onClose={handleAppDialogClose} headerText={'App Dialog'} bodyText={appDialogText}></AppDialog>

        {/* common app-wide notifications dialog */}
        <NotificationsDialog open={showNotificationsDialog} onClose={handleNotificationClose}></NotificationsDialog>

        {/* common app-wide toast */}
        <Snackbar style={{marginTop:50}}
            open={toastOpen}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Alert onClose={handleClose} severity="warning">
              ViewAction was sent to the view-component for whateva!
            </Alert>
        </Snackbar>
      </ThemeProvider>
     </div>
  );
}
export default App;

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyleft © DavidA Demo App '}{new Date().getFullYear()}{'.'}
    </Typography>
  );
}

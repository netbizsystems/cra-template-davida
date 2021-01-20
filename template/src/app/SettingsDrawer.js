
import React from 'react';

//#region MUI imports
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';

const settingDrawerStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
//#endregion 

export default function SettingsDrawer(props) {
  const classes = settingDrawerStyles();
  const toggleDrawer = (anchor, open) => (event) => {
    props.close();
  };

  const settingsView = (anchor) => (
    <Box p={3}
      className={classes.root}
      role="presentation"
    >
      <Grid container>
        <Grid item xs={6}>
            <Box component="span">App Settings</Box>
        </Grid>
        <Grid item xs={6}>
            <Box style={{display: "flex"}}>
                <CloseIcon style={{marginLeft: "auto"}} onClick={props.close}/>
            </Box>
        </Grid>
      </Grid>

      <Box mt={2}><Divider /></Box>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Setting Section 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Setting Section 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion disabled>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography className={classes.heading}>Disabled AccordionSetting Section</Typography>
          </AccordionSummary>
        </Accordion>
    </Box>
  );

  return (
    <Box>
        <SwipeableDrawer
            anchor={'right'}
            //open={props.open}
            open={props.open}
            onClose={toggleDrawer('right', false)}
            onOpen={toggleDrawer('right', true)}
        >
            {settingsView('right')}
        </SwipeableDrawer>
    </Box>
  );
}

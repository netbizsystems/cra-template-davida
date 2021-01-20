
import React from "react";
import PropTypes from 'prop-types';

//#region > MUI Imports
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';

const useStyles = makeStyles({
  root: {
  },
});
//#endregion

export default function NotificationsDialog(props) {
  const classes = useStyles();
  const { open, onClose  } = props;

  //#region > event handlers
  //#endregion
  
  return (
    <Dialog className={classes.root}
      fullWidth={true}
      maxWidth={'lg'}
      onClose={onClose}
      aria-labelledby="notifications-dialog-title"
      open={open}
    >
      <DialogTitle id="notifications-dialog-title">{'Notifications Dialog'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
              {'coming soon.. a centralized place to keep user informed'}<br></br>
              <a href="https://material-ui.com/components/dialogs/">read here</a>
          </DialogContentText>
        </DialogContent>
    </Dialog>
  );
}

NotificationsDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  //selectedValue: PropTypes.string.isRequired,
};


import React from "react";
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';

//#region > MUI Imports
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';

const myStyles = makeStyles({
  root: {
  },
});
//#endregion

export default function SimpleDialog(props) {
  const myClasses = myStyles();
  const { onClose, open, headerText, bodyText, } = props;
  const [fullWidth,] = React.useState(true);
  const [maxWidth,] = React.useState('sm');  

  //#region > event handlers
  const handleClose = () => {
    onClose('selectedValue');
  };
  //#endregion
  
  return (
    <Dialog
      className={myClasses.root}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">{headerText}</DialogTitle>
        <DialogContent>
          <DialogContentText>
              {bodyText}<br></br>
              <a href="https://material-ui.com/components/dialogs/">read here</a>
          </DialogContentText>
        </DialogContent>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  //onClose: PropTypes.func.isRequired,
  //open: PropTypes.bool.isRequired,
  //selectedValue: PropTypes.string.isRequired,
};

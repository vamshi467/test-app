import React  ,  { useState }from 'react';
//material-ui Imports
import { Button, TextField } from '@material-ui/core';
// import { spacing } from '@material-ui/system';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
// Local Imports
const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: purple[500],
      '&:hover': {
        backgroundColor: purple[700],
      },
    },
  }))(Button);

  export default ColorButton
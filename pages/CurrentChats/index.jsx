//use next's Link to pass chat id
// <Link href={`/CurrentChats/${id}}><Component /></Link>

import React from 'react';
import * as C from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';


import SendIcon from '@material-ui/icons/Send';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh'
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  }
});

const CurrentChats = () => {
  const style = useStyles();

  return (
    <div>
      <div>
        <C.Grid container>
            <C.Grid item xs={12} >
                <C.Typography variant="h5" className="header-message">Chat</C.Typography>
            </C.Grid>
        </C.Grid>

        <C.Grid container component={C.Paper} className={style.chatSection}>
            <C.Grid item xs={12}>
                <C.List className={style.messageArea}>

  {/* ALTERNATE LEFT AND RIGHT MESSAGES */}
  {/* I WILL MOVE THESE TO INDIVIDUAL MESSAGE PANESL THAT ALIGN LEFT OR RIGHT DEPENDING ON THE PERSON */}
  
                    <C.ListItem key="1">
                        <C.Grid container>
                            <C.Grid item xs={12}>
                                <C.ListItemText align="right" primary="Hi I'm a message!"></C.ListItemText>
                            </C.Grid>
                            <C.Grid item xs={12}>
                                <C.ListItemText align="right" secondary="09:30"></C.ListItemText>
                            </C.Grid>
                        </C.Grid>
                    </C.ListItem>
                    
                    <C.ListItem key="2">
                        <C.Grid container>
                            <C.Grid item xs={12}>
                                <C.ListItemText align="left" primary="Woah Message What's up my guy"></C.ListItemText>
                            </C.Grid>
                            <C.Grid item xs={12}>
                                <C.ListItemText align="left" secondary="07:32"></C.ListItemText>
                            </C.Grid>
                        </C.Grid>
                    </C.ListItem>

                    <C.ListItem key="3">
                        <C.Grid container>
                            <C.Grid item xs={12}>
                                <C.ListItemText align="right" primary="NM. Just Chillin and being a message"></C.ListItemText>
                            </C.Grid>

                            <C.Grid item xs={12}>
                                <C.ListItemText align="right" secondary="8:21"></C.ListItemText>
                            </C.Grid>
                        </C.Grid>
                    </C.ListItem>
                    
                </C.List>
                <C.Divider />
                <C.Grid container style={{}}>
                   
                        <C.TextField id="outlined-basic-email" label="Type Something" fullWidth />
        
                </C.Grid>
            </C.Grid>
        </C.Grid>
        </div>
    </div>
  )
};

export default CurrentChats;

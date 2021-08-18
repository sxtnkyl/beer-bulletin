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
    height: '80vh',
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto',
  },
  typeArea: {
    padding: '0px 10px'
  }
});

const CurrentChats = () => {
  const style = useStyles();

  return (
    <div>
      <div>
      <C.Grid container>
        <C.Grid container>
            <C.Grid item xs={12} >
                <C.Typography variant="h5" className="header-message">Chat</C.Typography>
            </C.Grid>
        </C.Grid>

        <C.Grid container component={C.Paper} className={style.chatSection}>
            <C.Grid item xs={12}>
                <C.List className={style.messageArea}>

                {/* ALTERNATE LEFT AND RIGHT MESSAGES */}  

                {/* insert messagepanel.js here */}


                </C.List>
                <C.Divider />
                <C.Grid className= {style.typeArea} >
                        <C.TextField id="outlined-basic-email" label="Username" fullWidth/>
        
                </C.Grid>
            </C.Grid>
        </C.Grid>
        </C.Grid>
        </div>
    </div>
  )
};

export default CurrentChats;

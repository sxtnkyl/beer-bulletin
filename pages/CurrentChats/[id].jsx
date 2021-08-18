//dynamic route for an individual post
// domain.com/CurrentChats/:id

import socket from '../../middleware/socket';

import React, { useState, useEffect } from "react";
import * as C from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import MessagePanel from "./MessagePanel";


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

//Pass chat ID here??
const Chat = () => {
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


                {/* insert messagepanel.js here */}
                <MessagePanel chatContent='hello'/>

                
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

/*const Chat = () => {
    return(
        <form className="message-form" onSubmit={handleSubmit}>
        <input
          className="message-input"
          placeholder="Send a message..."
          value={value}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        <label htmlFor="upload-button">
          <span className="image-button">
            <PictureOutlined className="picture-icon" />
          </span>
        </label>
        <input
          type="file"
          multiple={false}
          id="upload-button"
          style={{ display: 'none' }}
          onChange={handleUpload.bind(this)}
        />
        <button type="submit" className="send-button">
          <SendOutlined className="send-icon" />
        </button>
      </form>
    )
}
*/

export default Chat;

//dynamic route for an individual post
// domain.com/CurrentChats/:id

import socket from '../../middleware/socket';

import React, { useState, useEffect } from "react";
import * as C from "@material-ui/core";

const useStyles = C.makeStyles((theme) => ({

  }));

const Chat = () => {
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

export default Chat;

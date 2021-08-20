import React from 'react';
import * as C from "@material-ui/core";

const MessagePanel = (props) => {

  return(
    <C.ListItem key="1">
    <C.Grid container>

      <C.Grid item xs={12}>
          {/* align need to be a variable that alternates, same with primary  */}
        <C.ListItemText align="right" primary= {props.chatContent}></C.ListItemText>
      </C.Grid>

      <C.Grid item xs={12}>
                                        {/* this needs to be a prop for time */}
        <C.ListItemText align="right" secondary="09:30"></C.ListItemText>
      </C.Grid>

    </C.Grid>
    </C.ListItem>
);
}

export default MessagePanel;
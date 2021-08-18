import React from 'react';
import * as C from "@material-ui/core";

const messagePanel = () => {

  return(
    <C.ListItem key="1">
    <C.Grid container>

      <C.Grid item xs={12}>
          {/* align need to be a variable that alternates, same with primary  */}
        <C.ListItemText align="right" primary="Hi I'm a message!"></C.ListItemText>
      </C.Grid>

      <C.Grid item xs={12}>
        <C.ListItemText align="right" secondary="09:30"></C.ListItemText>
      </C.Grid>

    </C.Grid>
    </C.ListItem>
);
}

export default messagePanel;
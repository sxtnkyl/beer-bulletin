import React from 'react';
import * as C from '@material-ui/core';

const useStyles = C.makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        
      },
    },
}));

export default function createPostForm() {

    const classes = useStyles();
    const [value, setValue] = React.useState('Controlled');
  
    const handleChange = (event) => {
      setValue(event.target.value);
    };

    return(
        <div style={{display:'flex',justifyContent:'center', flexBasis:"100px" ,marginTop:'5em'}}>
            <C.Card >
                <C.CardContent align="center" >
                    <h1>Create Post</h1>
                    <hr/>
                    <form>
                    <br/>
                    <C.TextField 
                        id="post-title" 
                        label="Title" 
                        variant="outlined" />

                    <br/><br/>
                    

                    <C.TextField
                        id="outlined-multiline-static"
                        label="Describe Your Offer"
                        multiline
                        rows={4}
                        defaultValue=""
                        variant="outlined"
                     />
                    <br /><br />
                    <C.Button variant="contained" component="label">
                       
                    Upload File
                    <input
                        type="file"
                        hidden
                    />
                    </C.Button>

                    <br /><br /><hr /><br />

                    <C.Button variant="contained" color="primary" href="#">
                        Submit
                    </C.Button>

                    </form>
                </C.CardContent>
            </C.Card>
        </div>
    )
}
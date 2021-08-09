import React from 'react';
import * as C from '@material-ui/core';


// Yeah i realize this is messy. Gonna clean it up. 
// Right Now we really are only submitting 2 things

export default function createPostForm() {
    return(
        <div style={{display:'flex',justifyContent:'center', marginTop:'5em'}}>
            <C.Card style={{display: 'inline-block'}} >
                <C.CardContent align="center" >
                    <h1>Create Post</h1>
                    <form>
                   
                    <C.TextField id="post-title" label="Title" variant="outlined" />
                    <br />
                    <C.TextField id="post-description" label="Description" variant="outlined" />
                    <br />
                    {/* IMAGE SUBMIT */}
                    </form>
                </C.CardContent>
            </C.Card>
        </div>
    )
}
import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export default function Home() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Next.js Home Page
      </Typography>
    </Container>
  );
}

//add some rendering logic to assess auth state and redirect
//maybe make / route splash page?

// export async function getStaticProps(context) {

//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }

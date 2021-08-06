import React, { useState } from "react";
import BottomNav from "./bottomNav";
import Header from "./header";
import * as C from "@material-ui/core";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { useSession } from "next-auth/client";
//https://nextjs.org/docs/basic-features/layouts

const Layout = ({ children }) => {
  const [session, loading] = useSession();

  const [scrollEl, setScrollEl] = useState(undefined);
  const scrollTrigger = useScrollTrigger({
    threshold: 20,
    target: scrollEl,
  });

  return (
    <>
      {/* {!session && <Header scroll={scrollTrigger} />} */}
      <C.Container
        ref={(node) => {
          if (node) {
            setScrollEl(node);
          }
        }}
        component="main"
      >
        {children}
      </C.Container>
      <BottomNav />
    </>
  );
};

export default Layout;

//Future use for conditional layouts (mobile vs desktop)

// Page.getLayout = (page) => (
//   <Layout>
//     <NestedLayout>{page}</NestedLayout>
//   </Layout>
// )

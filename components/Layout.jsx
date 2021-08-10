import React, { useState, useEffect } from "react";
import BottomNav from "./bottomNav";
import Header from "./header";
import * as C from "@material-ui/core";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { motion, useTransform, useMotionValue } from "framer-motion";
import useFramerScroll from "../util/hooks/useFramerScroll";
import { useSession } from "next-auth/client";
import theme from "../styles/theme";
//https://nextjs.org/docs/basic-features/layouts

const Layout = ({ children }) => {
  // const [session, loading] = useSession();

  const scrollTrigger = useScrollTrigger({
    threshold: 20,
  });

  const bg = useFramerScroll();
  const y = useMotionValue();
  useEffect(() => {
    y.set(bg);
  }, [bg, y]);
  const yRange = [0, 0.5, 1];
  const background = useTransform(y, yRange, [
    `linear-gradient(180deg, #06baec 0%, #fafafa 100%)`,
    `linear-gradient(180deg, #fafafa 0%, #f1da00 100%)`,
    `linear-gradient(180deg, #f1da00 0%, #06baec 100%)`,
  ]);

  return (
    <>
      {/* {!session && <Header scroll={scrollTrigger} />} */}
      <C.Container
        style={{ background }}
        transition={{
          duration: 0.5,
          ease: [0.075, 0.82, 0.165, 1],
        }}
        component={motion.main}
      >
        {children}
      </C.Container>
      <BottomNav scroll={scrollTrigger} />
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

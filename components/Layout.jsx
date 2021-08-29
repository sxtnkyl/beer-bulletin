import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import BottomNav from "./bottomNav";
import Header from "./Header";
import * as C from "@material-ui/core";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { motion, useTransform, useMotionValue } from "framer-motion";
import useFramerScroll from "../util/hooks/useFramerScroll";
import theme from "../styles/theme";
//https://nextjs.org/docs/basic-features/layouts

const Layout = ({ children, user, baseApiUrl, origin }) => {
  const router = useRouter();
  const checkheader = !router.pathname.includes("Auth") && !user && true;

  const scrollTrigger = useScrollTrigger({
    threshold: 20,
  });

  const bg = useFramerScroll();
  const y = useMotionValue();
  useEffect(() => {
    y.set(bg);
  }, [bg, y]);
  const yRange = router.pathname == "/" ? [0, 0.5, 1] : [0, 1];
  const gradientArr =
    router.pathname == "/"
      ? [
          `linear-gradient(180deg, #06baec 0%, #fafafa 100%)`,
          `linear-gradient(180deg, #fafafa 0%, #f1da00 100%)`,
          `linear-gradient(180deg, #f1da00 0%, #06baec 100%)`,
        ]
      : [
          `linear-gradient(180deg, #06baec 0%, ${theme.palette.primary.light} 100%)`,
          `linear-gradient(180deg, ${theme.palette.primary.light} 0%, #06baec 100%)`,
        ];

  const background = useTransform(y, yRange, gradientArr);

  return (
    <>
      {checkheader && <Header scroll={scrollTrigger} />}
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
      <BottomNav scroll={scrollTrigger} user={user} baseApiUrl={baseApiUrl} />
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

import { useState, useEffect } from "react";
import { useViewportScroll } from "framer-motion";

const useFramerScroll = () => {
  const { scrollYProgress } = useViewportScroll();
  const [hookedYPosition, setHookedYPosition] = useState(0);
  useEffect(() => {
    scrollYProgress.onChange((v) => setHookedYPosition(v));
  }, [scrollYProgress, setHookedYPosition]);

  return hookedYPosition;
};

export default useFramerScroll;

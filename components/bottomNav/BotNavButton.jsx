import PropTypes from "prop-types";
import { forwardRef } from "react";
import NextLink from "next/link";
import * as C from "@material-ui/core";

const Link = forwardRef(({ href, as, prefetch, ...props }, ref) => {
  return (
    <NextLink href={href} as={as} prefetch={prefetch} passHref>
      <C.BottomNavigationAction ref={ref} {...props} />
    </NextLink>
  );
});

Link.displayName = "Link";

Link.defaultProps = {
  href: "#",
  prefetch: false,
};

Link.propTypes = {
  href: PropTypes.string,
  as: PropTypes.string,
  prefetch: PropTypes.bool,
};

export default Link;

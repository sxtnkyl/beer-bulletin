import React, { useState, useEffect } from "react";
import * as C from "@material-ui/core";
import theme from "../styles/theme";

import { faBeer } from "@fortawesome/free-solid-svg-icons";
import {
  faGithubAlt,
  faGitAlt,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import ScalableIcon from "../components/ScalableIcon";

const useStyles = C.makeStyles((theme) => ({
  landingSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  sectionTitle: {},
  sectionImage: { width: "80%" },
  transitionIcon: {},
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
}));

const Landing = () => {
  const t = useStyles();
  return (
    <C.Container>
      <div className={t.landingSection} id="section1">
        <h1>Connect with fellow beer lovers looking to trade brews!</h1>
        <h5>
          Use our platform to search for beers you can't find, see what others
          offer for your rare brew, or browse through the community.
        </h5>
        <C.Button
          fullWidth={false}
          variant="outlined"
          startIcon={<ScalableIcon icon={faBeer} />}
        >
          Get Started
        </C.Button>
        <h5></h5>
        <iframe></iframe>
      </div>
      <div className={t.landingSection} id="section2">
        <h3 className={t.sectionTitle}>Post a trade!</h3>
        <iframe></iframe>
        <h5>
          Make a public post to let others know you are offering or seeking a
          beer. Add context to a post to let others know you are seeking certain
          styles, or a specific beer.
        </h5>
      </div>
      <div className={t.landingSection} id="section3">
        <h3 className={t.sectionTitle}>View or make offers!</h3>
        <iframe></iframe>
        <h5>
          View all of the offers you have received on a post, or suggest a trade
          for another user's post.
        </h5>
      </div>
      <div className={t.landingSection} id="section3">
        <h3 className={t.sectionTitle}>Strike a deal!</h3>
        <iframe></iframe>
        <h5>
          If a post's user likes your offer, negotiate a trade in a one-on-one
          chat. Either party can cancel the chat at anytime.
        </h5>
      </div>
      <div className={t.landingSection} id="section4">
        <h3 className={t.sectionTitle}>Swap your brews!</h3>
        <iframe></iframe>
        <h5>After a successful negotiation the chat is resolved!</h5>
      </div>
      <div className={t.footer} id="footer">
        <C.Button
          color="primary"
          fullWidth={false}
          variant="contained"
          startIcon={<ScalableIcon icon={faGithubAlt} />}
        >
          KS
        </C.Button>
        <C.Button
          color="primary"
          fullWidth={false}
          variant="text"
          startIcon={<ScalableIcon icon={faGithub} />}
        >
          RP
        </C.Button>
        <C.Button
          color="primary"
          fullWidth={false}
          variant="outlined"
          startIcon={<ScalableIcon icon={faGitAlt} />}
        >
          AH
        </C.Button>
      </div>
    </C.Container>
  );
};

export default Landing;

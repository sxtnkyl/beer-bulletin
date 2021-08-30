import React, { useState, useEffect } from "react";
import * as C from "@material-ui/core";
import { absoluteUrl } from "../middleware/utils";
import Link from "next/link";
import theme from "../styles/theme";
import {
  faBeer,
  faLevelDownAlt,
  faClipboardList,
  faAddressCard,
  faLongArrowAltDown,
  faComments,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";
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
    alignItems: "center",
    textAlign: "center",
    margin: "30px 0px",
  },
  sectionTitle: {},
  sectionImage: { width: "80%" },
  transitionIcon: {
    alignSelf: "center",
    margin: "15px 0px",
  },
  media: {
    height: '350px',
    width: 'auto'
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: "30px 0px",
  },
}));

const Landing = (props) => {
  const t = useStyles();
  return (
    <C.Container style={{ marginBottom: "0px" }}>
      <div className={t.landingSection} id="section1">
        <C.Typography variant="h2">
          Join the Beer Bulletin community to begin connecting with fellow beer
          lovers looking to trade brews!
        </C.Typography>
        <Link
          passHref
          href={{ pathname: `/Auth`, query: { slug: "register" } }}
          as="/Auth/register"
        >
          <C.Button
            style={{ marginBottom: "15px" }}
            color="secondary"
            variant="contained"
            startIcon={<ScalableIcon icon={faBeer} />}
          >
            Get Started
          </C.Button>
        </Link>
        <C.Typography variant="body1">
          Use our platform to search for beers you can't find, see what others
          offer for your rare brew, or browse through the community.
        </C.Typography>
        <C.Typography variant="body1">Find your trade today!</C.Typography>
   

        {/* PLACE FOR OUR LOGO */}
        {/* <C.Card
          elevation={5}
          style={{ height: "50px", width: "50px", margin: "30px 0px" }}>
            <C.CardMedia
              className = {t.media}
              image={'images/BeerBarter.jpg'}
            /> 
        </C.Card>
   */}
   
        <ScalableIcon
          className={t.transitionIcon}
          icon={faLevelDownAlt}
          width="52"
          height="52"
          pad="15"
        />
        <ScalableIcon
          className={t.transitionIcon}
          icon={faClipboardList}
          width="72"
          height="72"
        />
      </div>

      <div className={t.landingSection} id="section2">
        <C.Typography variant="h2" className={t.sectionTitle}>
          Post a trade!
        </C.Typography>
        <C.Typography variant="body1">
          Make a public post to let others know you are offering or seeking a
          beer. Add context to a post to let others know you are seeking certain
          styles, or a specific beer.
        </C.Typography>
        <C.Card
          elevation={5}
          style={{ height: "350px", width: "100%", margin: "30px 0px" }}
        >
            {/* IMAGE */}
            <C.CardMedia
              className = {t.media}
              image={'images/post.jpeg'}
            />

        </C.Card>
        <ScalableIcon icon={faLongArrowAltDown} width="52" height="52" />
        <ScalableIcon icon={faAddressCard} width="72" height="72" />
      </div>

      <div className={t.landingSection} id="section3">
        <C.Typography variant="h2" className={t.sectionTitle}>
          View or make offers!
        </C.Typography>
        <C.Typography variant="body1">
          View all of the offers you have received on a post, or suggest a trade
          for another user's post.
        </C.Typography>
        <C.Card
          elevation={5}
          style={{ height: "350px", width: "100%", margin: "30px 0px" }}
        >
          {/* IMAGE */}
          <C.CardMedia
            className = {t.media}
            image={'images/tallboy.jpeg'}
          />

        </C.Card>
        <ScalableIcon icon={faComments} width="72" height="72" />
      </div>

      <div className={t.landingSection} id="section3">
        <C.Typography variant="h2" className={t.sectionTitle}>
          Strike a deal!
        </C.Typography>
        <C.Typography variant="body1">
          If a post's user likes your offer, negotiate a trade in a one-on-one
          chat. Either party can cancel the chat at anytime.
        </C.Typography>
        <C.Card
          elevation={5}
          style={{ height: "350px", width: "100%", margin: "30px 0px" }}
        >
           {/* IMAGE */}
          <C.CardMedia
            className = {t.media}
            image={'images/foam.jpg'}
          />
        </C.Card>

        <ScalableIcon icon={faHandshake} width="72" height="72" />
      </div>

      <div className={t.landingSection} id="section4">
        <C.Typography variant="h2" className={t.sectionTitle}>
          Swap your brews!
        </C.Typography>
        <C.Typography variant="body1">
          After a successful negotiation the chat is resolved!
        </C.Typography>
        <C.Card
          elevation={5}
          style={{ height: "350px", width: "100%", margin: "30px 0px" }}
        >
           {/* IMAGE */}
          <C.CardMedia
            className = {t.media}
            image={'images/clink.jpeg'}
          />

        </C.Card>
      </div>

      <div className={t.landingSection} id="section5">
        <C.Typography variant="h2" className={t.sectionTitle}>
          Unlimited lifetime trades, for free!
        </C.Typography>
        <Link
          passHref
          href={{ pathname: `/Auth`, query: { slug: "register" } }}
          as="/Auth/register"
        >
          <C.Button
            color="secondary"
            variant="contained"
            startIcon={<ScalableIcon icon={faBeer} />}
            style={{ marginBottom: "15px" }}
          >
            Join Now!
          </C.Button>
        </Link>
        <C.Typography variant="body1">
          Join the community and see what what you'll find. Better yet, what
          others can offer you!
        </C.Typography>
      </div>

      <div className={t.footer} id="footer">
        <C.Button
          fullWidth={false}
          variant="text"
          startIcon={<ScalableIcon icon={faGithubAlt} />}
          href="https://github.com/sxtnkyl"
        >
          KS
        </C.Button>
        <C.Button
          fullWidth={false}
          variant="text"
          startIcon={<ScalableIcon icon={faGithub} />}
          href="https://github.com/perez-rob"
        >
          RP
        </C.Button>
        <C.Button
          fullWidth={false}
          variant="text"
          startIcon={<ScalableIcon icon={faGitAlt} />}
          href="https://github.com/ahuffma2"
        >
          AH
        </C.Button>
      </div>
    </C.Container>
  );
};

export default Landing;

export async function getServerSideProps(context) {
  const { req } = context;
  const { origin } = absoluteUrl(req);

  return {
    props: {
      origin,
    },
  };
}

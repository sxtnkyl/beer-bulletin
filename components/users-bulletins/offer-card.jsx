import { useState, useEffect } from "react";
import Link from "next/link";
import * as C from "@material-ui/core";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import GlassCard from "../glassCard";
import ScalableIcon from "../ScalableIcon";
import theme from "../../styles/theme";

const useStyles = C.makeStyles((theme) => ({
  stretch: {
    display: "flex",
    flex: "1 1 auto",
    alignItems: "stretch",
    textAlign: "center",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  bot: {
    // position: "absolute",
    // bottom: "0",
    flex: "1 1 auto",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
}));

const OfferCard = (props) => {
  const { id, participant_id, toggleOffers, host, trade, resolved } = props;
  const { title, content } = trade;
  const classes = useStyles();

  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  //add cash, beer, other
  const [data, setData] = useState({
    id,
    participant_id,
    cash: "tempCash",
    beer: "tempBeer",
    other: "tempOther",
  });
  const [deleteMessage, setDeleteMessage] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setData({
      ...data,
      [name]: value,
    });
  };
  const toggleEdit = () => {
    setEdit(!edit);
  };
  const handleEditSubmit = async () => {
    // setLoading(!loading);
    const formUpdate = { ...data };
    console.log(formUpdate);
    // const editBulletin = await fetch(`${baseApiUrl}/offers/${id}`, {
    //   method: "PUT",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     authorization: token || "",
    //   },
    //   body: JSON.stringify(data),
    // }).catch((error) => {
    //   console.error("Error:", error);
    // });

    // const editRes = await editBulletin.json();
    // setLoading(false);
  };

  const handleDelete = async () => {
    // setLoading(!loading)
    // const deleteBulletin = await fetch(`${baseApiUrl}/offers/${id}`, {
    //   method: "DELETE",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     authorization: token || "",
    //   },
    //   body: JSON.stringify(data),
    // }).catch((error) => {
    //   console.error("Error:", error);
    // });
    // const deleteRes = await deleteBulletin.json();
    // setDeleteMessage("Successfully Deleted!");
    // setLoading(false)
  };

  const offerParams = ["cash", "beer", "other"];
  const offerBlock = offerParams.map((offer, i) =>
    !edit ? (
      //update to props val instead of state val
      <C.Typography key={i} variant="body1">
        {offer}: {data[offer]}
      </C.Typography>
    ) : (
      <C.TextField
        key={i}
        label={offer}
        placeholder={data[offer]}
        onChange={handleChange}
        name={offer}
        value={data[offer]}
      />
    )
  );

  const infoBlock = (
    <C.CardActionArea className={classes.stretch}>
      <C.CardContent className={classes.content}>
        <C.Typography variant="body1">{content}</C.Typography>
        <C.Typography
          variant="h6"
          style={{ margin: "15px 0px", textAlign: "left" }}
        >
          Currently Offering...
        </C.Typography>
        {offerBlock}
      </C.CardContent>
    </C.CardActionArea>
  );

  const slider = (
    <C.CardActions className={classes.bot}>
      <Link
        passHref
        href={{
          pathname: `/SearchBulletins/${trade.id}`,
          query: { type: toggleOffers ? "offer" : "bulletin" },
        }}
      >
        <C.Button size="small" variant="outlined" style={{ width: "auto" }}>
          View Bulletin
        </C.Button>
      </Link>
      <C.Button
        disabled={loading}
        size="small"
        variant="outlined"
        style={{ width: "auto" }}
      >
        Delete Offer
      </C.Button>
    </C.CardActions>
  );

  return (
    <>
      {deleteMessage ? (
        deleteMessage
      ) : (
        <GlassCard>
          <C.CardHeader
            title={<C.Typography variant="h6">{title}</C.Typography>}
            subheader={`Posted By: ${host.username}`}
            align="left"
            action={
              <C.Button onClick={toggleEdit}>
                <ScalableIcon icon={faEdit} color={edit && "white"} />
              </C.Button>
            }
          />
          {infoBlock}
          <C.Divider variant="middle" />
          {slider}
          {edit && (
            <C.Button
              size="small"
              variant="outlined"
              disabled={loading}
              style={{
                width: "fit-content",
                alignSelf: "center",
                margin: "15px 0px",
              }}
              onClick={handleEditSubmit}
            >
              Submit Edits
            </C.Button>
          )}
        </GlassCard>
      )}
    </>
  );
};

export default OfferCard;

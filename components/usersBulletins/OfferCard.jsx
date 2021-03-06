import { useState, useEffect } from "react";
import Link from "next/link";
import * as C from "@material-ui/core";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import GlassCard from "../GlassCard";
import ScalableIcon from "../ScalableIcon";
import theme from "../../styles/theme";
import Image from "next/image";

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
  const {
    id,
    participant_id,
    toggleOffers,
    host,
    trade,
    offer_money,
    offer_beer,
    offer_other,
    endpoint,
    resolved,
    token,
    baseApiUrl,
  } = props;
  const { title, content, picture } = trade;
  const classes = useStyles();

  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  //add cash, beer, other
  const [data, setData] = useState({
    id,
    participant_id,
    offer_money,
    offer_beer,
    offer_other,
  });
  const [deleteMessage, setDeleteMessage] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setDeleteMessage("");
    }, 3000);
  }, [deleteMessage]);
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
    setLoading(!loading);
    const formUpdate = { ...data };
    console.log(formUpdate);
    const editBulletin = await fetch(`${baseApiUrl}/offers/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: token || "",
      },
      body: JSON.stringify(formUpdate),
    }).catch((error) => {
      console.error("Error:", error);
    });

    const editRes = await editBulletin.json();
    editRes && setEdit(!edit);
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(!loading);
    const deleteBulletin = await fetch(`${baseApiUrl}/offers/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: token || "",
      },
      body: JSON.stringify(data),
    }).catch((error) => {
      console.error("Error:", error);
    });
    const deleteRes = await deleteBulletin.json();
    setDeleteMessage("Successfully Deleted!");
    setLoading(false);
  };

  const offerParams = ["Cash", "Beer", "Other"];
  const offerBlock = offerParams.map((offer, i) => {
    let dynamicVal =
      i == 0 ? data.offer_money : i == 1 ? data.offer_beer : data.offer_other;
    let dynamicName =
      i == 0 ? "offer_money" : i == 1 ? "offer_beer" : "offer_other";
    let el = !edit ? (
      <C.Typography key={i} variant="body1">
        {dynamicVal ? (offer == "cash" ? "$" : dynamicVal) : ""}
      </C.Typography>
    ) : (
      <C.TextField
        key={i}
        label={offer}
        placeholder={
          typeof dynamicVal == "number" ? dynamicVal.toString() : dynamicVal
        }
        onChange={handleChange}
        name={dynamicName}
        value={dynamicVal == null ? "" : dynamicVal}
      />
    );
    return el;
  });

  const infoBlock = (
    <C.CardActionArea className={classes.stretch}>
      <C.CardContent className={classes.content}>
        {picture && (
          <Image src={picture} alt={title} width={100} height={100} />
        )}
        <br />
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
      <Link
        passHref
        href={{
          pathname: `/CurrentChats/[id]`,
          query: { id: endpoint, partUserName: host.username },
        }}
        as={`/CurrentChats/${endpoint}`}
      >
        <C.Button size="small" variant="outlined" style={{ width: "auto" }}>
          Chat
        </C.Button>
      </Link>
      <C.Button
        disabled={loading}
        size="small"
        variant="outlined"
        style={{ width: "auto" }}
        onClick={handleDelete}
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

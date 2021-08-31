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

const BulletinCard = (props) => {
  const {
    toggleOffers,
    id,
    user_id,
    title,
    content,
    current_offers,
    offers,
    seeking,
    open,
    baseApiUrl,
    token,
    picture,
    user,
  } = props;
  const classes = useStyles();
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    id,
    user_id,
    title,
    content,
    current_offers,
    open,
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
    setLoading(!loading);
    const formUpdate = { ...data };
    const editBulletin = await fetch(`${baseApiUrl}/trades/${id}`, {
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
    const deleteBulletin = await fetch(`${baseApiUrl}/trades/${id}`, {
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

  const infoBlock = (
    <C.CardActionArea className={classes.stretch}>
        {picture && (
          <Image src={picture} alt={title} width={100} height={100} />
        )}
      <C.CardContent className={classes.content}>

        <C.Typography variant="h6">
          Currently {seeking ? "Seeking..." : "Offering..."}
        </C.Typography>
        {!edit ? (
          <C.Typography variant="body1">{data.content}</C.Typography>
        ) : (
          <C.TextField
            placeholder={data.content}
            onChange={handleChange}
            name="content"
            value={data.content}
          />
        )}
      </C.CardContent>
    </C.CardActionArea>
  );

  const slider = (
    <C.CardActions className={classes.bot}>
      <Link
        passHref
        href={{
          pathname: `/UsersBulletins/${id}`,
          query: { type: toggleOffers ? "offer" : "bulletin" },
        }}
      >
        <C.Button size="small" variant="outlined" style={{ width: "auto" }}>
          View Offers
        </C.Button>
      </Link>
      <C.Button
        disabled={loading}
        size="small"
        variant="outlined"
        style={{ width: "auto" }}
        onClick={handleDelete}
      >
        Delete Bulletin
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
            title={
              !edit ? (
                <C.Typography variant="h6">{data.title}</C.Typography>
              ) : (
                <C.TextField
                  placeholder={data.title}
                  onChange={handleChange}
                  name="title"
                  value={data.title}
                />
              )
            }
            subheader={`Current Offers: ${offers.length}`}
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
              disabled={loading}
              size="small"
              variant="outlined"
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

export default BulletinCard;

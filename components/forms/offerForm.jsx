import React, { useState, useEffect, useRef } from "react";
import * as C from "@material-ui/core";
import GlassCard from "../glassCard";
import { faBeer } from "@fortawesome/free-solid-svg-icons";
import ScalableIcon from "../ScalableIcon";
import MuiAlert from "@material-ui/lab/Alert";
import SliderBtn from "../buttons/SliderBtn";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CashSlider = C.withStyles({
  root: {
    color: "#fafafa",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid #06baec",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "#06baec",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
    color: "#06baec",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(C.Slider);

const useStyles = C.makeStyles(() => ({
  formItem: {
    margin: "15px 0px",
    width: "100%",
  },
}));

const formState = {
  cashChecked: false,
  beerChecked: false,
  otherChecked: false,
  cash: 0,
  beer: "",
  other: "",
};

const OfferForm = ({ bulletin, baseApiUrl, user, userHost }) => {
  const classes = useStyles();
  const { open, offers } = bulletin.data;
  //cash, beer, other
  const [form, setForm] = useState(formState);
  const [notValid, setNotValid] = useState(true);
  const [openToast, setOpenToast] = useState(false);

  const loggedUserOffer = offers.filter(
    (offer) => offer.participant.id === user.id
  );
  let oldOffer;
  if (loggedUserOffer.length) {
    oldOffer = {
      cashChecked: loggedUserOffer[0].offer_money ? true : false,
      beerChecked: loggedUserOffer[0].offer_beer.length ? true : false,
      otherChecked: loggedUserOffer[0].offer_other.length ? true : false,
      cash: loggedUserOffer[0].offer_money,
      beer: loggedUserOffer[0].offer_beer,
      other: loggedUserOffer[0].offer_other,
    };
  }

  useEffect(() => {
    if (loggedUserOffer.length) {
      setForm(oldOffer);
      setNotValid(false);
    }
  }, []);

  const handleChange = (name) => (event, newValue) => {
    switch (true) {
      case name == "cashChecked" && newValue == false:
        setForm({ ...form, [name]: newValue, cash: 0 });
        break;
      case name == "beerChecked" && newValue == false:
        setForm({ ...form, [name]: newValue, beer: "" });
        break;
      case name == "otherChecked" && newValue == false:
        setForm({ ...form, [name]: newValue, other: "" });
        break;
      default:
        setForm({ ...form, [name]: newValue });
    }
  };

  // used for updating offer to make sure something is changed
  function deepEqual(x, y) {
    const ok = Object.keys,
      tx = typeof x,
      ty = typeof y;
    return x && y && tx === "object" && tx === ty
      ? ok(x).length === ok(y).length &&
          ok(x).every((key) => deepEqual(x[key], y[key]))
      : x === y;
  }

  /// Special Validations
  useEffect(() => {
    if (form.cash == 0 && form.beer == "" && form.other == "") {
      setNotValid(true);
      return;
    } else if (
      form.cashChecked == false &&
      form.beerChecked == false &&
      form.otherChecked == false
    ) {
      setNotValid(true);
      return;
    }
    if (loggedUserOffer.length) {
      if (deepEqual(oldOffer, form)) {
        setNotValid(true);
        return;
      }
    }
    setNotValid(false);
    return;
  }, [form]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenToast(false);
  };

  const handleSubmit = async (e, form) => {
    e.preventDefault();

    let data;
    data = { ...data, offer_money: form.cashChecked ? form.cash : 0 };
    data = { ...data, offer_beer: form.beerChecked ? form.beer : "" };
    data = { ...data, offer_other: form.otherChecked ? form.other : "" };
    data = { ...data, host_id: userHost.data.id };
    data = { ...data, participant_id: user.id };
    data = { ...data, trade_id: bulletin.data.id };

    const offerApi = await fetch(
      `${baseApiUrl}/offers${
        loggedUserOffer.length ? "/" + loggedUserOffer[0].id : ""
      }`,
      {
        method: loggedUserOffer.length ? "PUT" : "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then(setOpenToast(true))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const slider = (
    <C.CardActions className={classes.bot}>
      <C.Button
        type="submit"
        color="secondary"
        variant="contained"
        startIcon={open && <ScalableIcon icon={faBeer} />}
        disabled={!open || notValid}
        style={{ width: "auto" }}
        onClick={(e) => handleSubmit(e, form)}
      >
        {loggedUserOffer.length
          ? "Update Offer"
          : open
          ? "Make Offer"
          : "Deal Pending"}
      </C.Button>
    </C.CardActions>
  );

  return (
    <>
      <GlassCard>
        <C.CardHeader title={`Offer Form`} align="right" />
        <C.Divider variant="middle" style={{ marginBottom: "15px" }} />
        <C.CardContent>
          <form>
            <C.CardActions style={{ justifyContent: "center" }}>
              <C.FormControlLabel
                control={
                  <C.Switch
                    color="secondary"
                    checked={form.cashChecked}
                    onChange={handleChange("cashChecked")}
                  />
                }
                label="Cash"
                labelPlacement="top"
              />

              <C.FormControlLabel
                control={
                  <C.Switch
                    color="secondary"
                    checked={form.beerChecked}
                    onChange={handleChange("beerChecked")}
                  />
                }
                label="Beer"
                labelPlacement="top"
              />

              <C.FormControlLabel
                control={
                  <C.Switch
                    color="secondary"
                    checked={form.otherChecked}
                    onChange={handleChange("otherChecked")}
                  />
                }
                label="Other"
                labelPlacement="top"
              />
            </C.CardActions>

            <C.CardActions style={{ flexDirection: "column" }}>
              {form.cashChecked && (
                <>
                  <C.TextField
                    className={classes.formItem}
                    aria-label="Cash input"
                    onChange={(e) => setForm({ ...form, cash: e.target.value })}
                    value={form.cash}
                    label="$"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                  <CashSlider
                    value={form.cash}
                    className={classes.formItem}
                    valueLabelDisplay="auto"
                    aria-label="Cash slider"
                    onChange={handleChange("cash")}
                  />
                </>
              )}
              {form.beerChecked && (
                <C.TextField
                  className={classes.formItem}
                  label="Beer"
                  placeholder="What can you offer?"
                  value={form.beer}
                  onChange={(e) => setForm({ ...form, beer: e.target.value })}
                  variant="outlined"
                />
              )}
              {form.otherChecked && (
                <C.TextField
                  className={classes.formItem}
                  label="Other"
                  placeholder="Have an unusual offer?"
                  value={form.other}
                  onChange={(e) => setForm({ ...form, other: e.target.value })}
                  variant="outlined"
                />
              )}
            </C.CardActions>
          </form>
        </C.CardContent>
      </GlassCard>
      {slider}
      {/* <SliderBtn /> */}
      <C.Snackbar
        open={openToast}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          {loggedUserOffer.length ? "Offer Updated" : "New Offer Posted"}
        </Alert>
      </C.Snackbar>
    </>
  );
};

export default OfferForm;

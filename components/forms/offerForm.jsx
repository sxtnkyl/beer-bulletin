import React, { useState, useEffect } from "react";
import * as C from "@material-ui/core";
import GlassCard from "../glassCard";
import { faBeer } from "@fortawesome/free-solid-svg-icons";
import ScalableIcon from "../ScalableIcon";

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
  cash: 20,
  beer: "",
  other: "",
};

const OfferForm = ({ bulletin, baseApiUrl, user, userHost }) => {
  const classes = useStyles();
  const { open } = bulletin.data;
  //cash, beer, other
  const [form, setForm] = useState(formState);

  const handleChange = (name) => (event, newValue) => {
    setForm({ ...form, [name]: newValue });
  };

  const handleSubmit = async (e, form) => {
    e.preventDefault();
    console.log("FORM", form);

    let data;
    data = { ...data, offer_money: form.cash || "" };
    data = { ...data, offer_beer: form.beer || "" };
    data = { ...data, offer_other: form.other || "" };
    data = { ...data, host_id: userHost.data.id || "" };
    data = { ...data, participant_id: user.id || "" };
    data = { ...data, trade_id: bulletin.data.id || "" };

    console.log("POST DATA", data);

    const offerApi = await fetch(`${baseApiUrl}/offers`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).catch((error) => {
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
        disabled={!open}
        style={{ width: "auto" }}
        onClick={(e) => handleSubmit(e, form)}
      >
        {open ? "Make Offer" : "Deal Pending"}
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
                    onChange={handleChange("cash")}
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
    </>
  );
};

export default OfferForm;

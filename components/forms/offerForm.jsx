import React, { useState, useEffect } from "react";
import * as C from "@material-ui/core";
import { FlashOnRounded } from "@material-ui/icons";

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

const OfferForm = () => {
  //cash, beer, other
  const [form, setForm] = useState({
    cashChecked: false,
    beerChecked: false,
    otherChecked: false,
    cash: 20,
    beer: "",
    other: "",
  });
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.checked });
  };

  return (
    <form>
      <C.FormControlLabel
        value="start"
        control={
          <C.Switch
            color="secondary"
            checked={form.cashChecked}
            onChange={handleChange}
            name="cashChecked"
          />
        }
        label="Cash"
        labelPlacement="start"
      />
      {form.cashChecked && (
        <CashSlider
          valueLabelDisplay="auto"
          aria-label="Cash slider"
          defaultValue={form.cash}
          name="cash"
        />
      )}
      <C.FormControlLabel
        value="start"
        control={
          <C.Switch
            color="secondary"
            checked={form.beerChecked}
            onChange={handleChange}
            name="beerChecked"
          />
        }
        label="Beer"
        labelPlacement="start"
      />
      {form.beerChecked && (
        <C.TextField
          id="outlined-beer"
          label="Beer"
          placeholder="What can you offer?"
          value={form.beer}
          name="beer"
          onChange={handleChange}
          variant="outlined"
        />
      )}
      <C.FormControlLabel
        value="start"
        control={
          <C.Switch
            color="secondary"
            checked={form.otherChecked}
            onChange={handleChange}
            name="otherChecked"
          />
        }
        label="Other"
        labelPlacement="start"
      />
      {form.otherChecked && (
        <C.TextField
          id="outlined-other"
          label="Other"
          placeholder="Have an unusual offer?"
          value={form.other}
          name="other"
          onChange={handleChange}
          variant="outlined"
        />
      )}
    </form>
  );
};

export default OfferForm;

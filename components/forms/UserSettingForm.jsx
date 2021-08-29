import React, { useState, useEffect, useRef } from "react";
import Router, { useRouter } from "next/router";
import * as C from "@material-ui/core";
import GlassCard from "../glassCard";
import SettingsIcon from "@material-ui/icons/Settings";
import ImageUpload from "../imageUpload";

const useStyles = C.makeStyles(() => ({
  formItem: {
    margin: "15px 0px",
    width: "100%",
  },
  stretch: {
    display: "flex",
    flex: "1 1 auto",
    alignItems: "stretch",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  bot: {
    flex: "1 1 auto",
    width: "100%",
  },
}));

const emailRegEx =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,2|3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/* register schemas */
const FORM_DATA = {
  username: {
    value: "",
    label: "Username",
    min: 8,
    max: 36,
    required: true,
    validator: {
      regEx: /^[a-z\sA-Z0-9\W\w]+$/,
      error: "Username fill correctly",
    },
  },
  email: {
    value: "",
    label: "Email",
    min: 10,
    max: 36,
    required: true,
    validator: {
      regEx: emailRegEx,
      error: "Email fill correctly",
    },
  },
  password: {
    value: "",
    label: "Password",
    min: 8,
    max: 36,
    required: true,
    validator: {
      regEx: /^[a-z\sA-Z0-9\W\w]+$/,
      error: "Password fill correctly",
    },
  },
  first_name: {
    value: "",
    label: "First Name",
    // min: 10,
    max: 36,
    required: false,
    validator: {
      regEx: /^[a-z\sA-Z0-9\W\w]+$/,
      error: "first name fill correctly",
    },
  },
  last_name: {
    value: "",
    label: "Last Name",
    // min: 10,
    max: 36,
    required: false,
    validator: {
      regEx: /^[a-z\sA-Z0-9\W\w]+$/,
      error: "last name fill correctly",
    },
  },
  profile_pic: {
    value: "",
    label: "Profile Pic",
    // min: 10,
    max: 36,
    required: false,
    validator: null,
  },
};

const UserInfoForm = ({
  origin,
  referer,
  token,
  user,
  baseApiUrl,
  toggleEdit,
  onRefresh,
}) => {
  const { id, username, email, password, first_name, last_name, profile_pic } =
    user.data;

  const uploadEl = useRef();
  const classes = useStyles();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [stateFormData, setStateFormData] = useState(FORM_DATA);
  const [stateFormError, setStateFormError] = useState({});
  const [stateFormValid, setStateFormValid] = useState(false);
  const [stateFormMessage, setStateFormMessage] = useState({});

  const [selectedUpload, setSelectedUpload] = useState(false);

  const oldData = {};
  oldData.username = username;
  oldData.email = email;
  oldData.first_name = first_name;
  oldData.last_name = last_name;
  oldData.profile_pic = profile_pic;

  useEffect(() => {
    setStateFormData({
      ...stateFormData,
      username: {
        ...stateFormData.username,
        validator: { ...stateFormData.username.validator },
        value: username,
      },
      email: {
        ...stateFormData.email,
        validator: { ...stateFormData.email.validator },

        value: email,
      },
      password: {
        ...stateFormData.password,
        validator: { ...stateFormData.password.validator },

        value: password,
      },
      first_name: {
        ...stateFormData.first_name,
        validator: { ...stateFormData.first_name.validator },

        value: first_name,
      },
      last_name: {
        ...stateFormData.last_name,
        validator: { ...stateFormData.last_name.validator },

        value: last_name,
      },
      profile_pic: {
        value: profile_pic,
      },
    });
  }, []);

  function deepEqual(x, y) {
    const ok = Object.keys,
      tx = typeof x,
      ty = typeof y;
    return x && y && tx === "object" && tx === ty
      ? ok(x).length === ok(y).length &&
          ok(x).every((key) => deepEqual(x[key], y[key]))
      : x === y;
  }

  function onChangeHandler(e) {
    setStateFormValid(false);
    const { name, value } = e.currentTarget;

    setStateFormData({
      ...stateFormData,
      [name]: {
        ...stateFormData[name],
        value,
      },
    });

    validationHandler(stateFormData, e);
  }

  useEffect(() => {
    // does not allow user to submit same info that is already in DB
    // is there a better way to get all the stateForm data excluding the password??????????????????????????????????????
    let currentData = {};
    currentData.username = stateFormData.username.value;
    currentData.email = stateFormData.email.value;
    currentData.first_name = stateFormData.first_name.value;
    currentData.last_name = stateFormData.last_name.value;
    currentData.profile_pic = stateFormData.profile_pic.value;
    if (deepEqual(oldData, currentData) && !selectedUpload) {
      setStateFormValid(false);
    } else {
      setStateFormValid(true);
    }
  }, [stateFormData]);

  function metaSubmit(e) {
    e.preventDefault();
    uploadEl.current.handleUpload(onSubmitHandler);
  }

  async function onSubmitHandler(profPicUrl) {
    // e.preventDefault();

    let data = { ...stateFormData };

    data = { ...data, username: data.username.value || "" };
    data = { ...data, email: data.email.value || "" };
    data = { ...data, password: data.password.value || "" };
    data = { ...data, first_name: data.first_name.value || "" };
    data = { ...data, last_name: data.last_name.value || "" };
    data = { ...data, profile_pic: profPicUrl || "" };

    const isValid = validationHandler(stateFormData);
    if (isValid) {
      setLoading(!loading);

      const userApi = await fetch(`${baseApiUrl}/users/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).catch((error) => {
        console.error("Error:", error);
      });
      let result = await userApi.json();
      if (result.status === "success") {
        //reset edit state and form
        setStateFormData(FORM_DATA);
        toggleEdit();
        onRefresh();
      } else {
        setStateFormMessage(result);
      }
      setLoading(false);
    }
  }

  function validationHandler(states, e) {
    const input = (e && e.target.name) || "";
    const errors = {};
    let isValid = true;

    if (input) {
      if (states[input].required) {
        if (!states[input].value) {
          errors[input] = {
            hint: `${states[e.target.name].label} required`,
            isInvalid: true,
          };
          isValid = false;
        }
      }
      if (
        states[input].value &&
        states[input].min > states[input].value.length + 1
      ) {
        errors[input] = {
          hint: `Min ${states[input].label} length ${states[input].min}`,
          isInvalid: true,
        };
        isValid = false;
      }
      if (
        states[input].value &&
        states[input].max < states[input].value.length
      ) {
        errors[input] = {
          hint: `Min ${states[input].label} length ${states[input].max}`,
          isInvalid: true,
        };
        isValid = false;
      }
      if (
        states[input].validator !== null &&
        typeof states[input].validator === "object"
      ) {
        if (
          states[input].value &&
          !states[input].validator.regEx.test(states[input].value)
        ) {
          errors[input] = {
            hint: states[input].validator.error,
            isInvalid: true,
          };
          isValid = false;
        }
      }
    } else {
      Object.entries(states).forEach((item) => {
        item.forEach((field) => {
          errors[item[0]] = "";
          if (field.required) {
            if (!field.value) {
              errors[item[0]] = {
                hint: `${field.label} required`,
                isInvalid: true,
              };
              isValid = false;
            }
          }
          if (field.value && field.min > field.value.length) {
            errors[item[0]] = {
              hint: `Min ${field.label} length ${field.min}`,
              isInvalid: true,
            };
            isValid = false;
          }
          if (field.value && field.max <= field.value.length) {
            errors[item[0]] = {
              hint: `Min ${field.label} length ${field.max}`,
              isInvalid: true,
            };
            isValid = false;
          }
          if (field.validator !== null && typeof field.validator === "object") {
            if (field.value && !field.validator.regEx.test(field.value)) {
              errors[item[0]] = {
                hint: field.validator.error,
                isInvalid: true,
              };
              isValid = false;
            }
          }
        });
      });
    }
    if (isValid) {
      setStateFormValid(isValid);
    }
    setStateFormError({
      ...errors,
    });
    return isValid;
  }

  return (
    <GlassCard>
      <C.CardContent>
        <form onSubmit={metaSubmit} className="form-register card" method="PUT">
          <C.FormGroup row>
            <C.FormHelperText>
              {stateFormMessage.status === "error" && (
                <C.Typography variant="h4">
                  {stateFormMessage.error}
                </C.Typography>
              )}
            </C.FormHelperText>
          </C.FormGroup>
          <C.FormGroup row>
            <C.TextField
              onChange={onChangeHandler}
              className={classes.formItem}
              label="Username"
              id="username"
              name="username"
              placeholder={username}
              readOnly={loading && true}
              // defaultValue={username}
              value={stateFormData.username.value}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <C.InputAdornment position="end">
                    <SettingsIcon />
                  </C.InputAdornment>
                ),
              }}
            />
            <C.FormHelperText>
              {stateFormError.username && stateFormError.username.hint}
            </C.FormHelperText>
          </C.FormGroup>
          <C.FormGroup row>
            <C.TextField
              onChange={onChangeHandler}
              className={classes.formItem}
              label="Email"
              id="email"
              name="email"
              placeholder={email}
              readOnly={loading && true}
              value={stateFormData.email.value}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <C.InputAdornment position="end">
                    <SettingsIcon />
                  </C.InputAdornment>
                ),
              }}
            />
            <C.FormHelperText>
              {stateFormError.email && stateFormError.email.hint}
            </C.FormHelperText>
          </C.FormGroup>
          <C.FormGroup row>
            <C.TextField
              onChange={onChangeHandler}
              className={classes.formItem}
              label="Password"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              readOnly={loading && true}
              value={stateFormData.password.value}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <C.InputAdornment position="end">
                    <SettingsIcon />
                  </C.InputAdornment>
                ),
              }}
            />
            <C.FormHelperText>
              {stateFormError.password && stateFormError.password.hint}
            </C.FormHelperText>
          </C.FormGroup>
          <C.FormGroup row>
            <C.TextField
              onChange={onChangeHandler}
              className={classes.formItem}
              label="First Name"
              id="first_name"
              name="first_name"
              placeholder={first_name}
              readOnly={loading && true}
              value={stateFormData.first_name.value}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <C.InputAdornment position="end">
                    <SettingsIcon />
                  </C.InputAdornment>
                ),
              }}
            />
            <C.FormHelperText>
              {stateFormError.first_name && stateFormError.first_name.hint}
            </C.FormHelperText>
          </C.FormGroup>
          <C.FormGroup row>
            <C.TextField
              onChange={onChangeHandler}
              className={classes.formItem}
              label="Last Name"
              id="last_name"
              name="last_name"
              placeholder={last_name}
              readOnly={loading && true}
              value={stateFormData.last_name.value}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <C.InputAdornment position="end">
                    <SettingsIcon />
                  </C.InputAdornment>
                ),
              }}
            />
            <C.FormHelperText>
              {stateFormError.last_name && stateFormError.last_name.hint}
            </C.FormHelperText>
          </C.FormGroup>

          <C.CardActions>
            <C.ButtonGroup
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <ImageUpload
                ref={uploadEl}
                baseApiUrl={baseApiUrl}
                oldData={oldData.profile_pic}
                setSelectedUpload={setSelectedUpload}
              />

              <C.Button
                type="submit"
                color="secondary"
                variant="contained"
                style={{ width: "auto" }}
                disabled={loading || !stateFormValid}
              >
                Update
              </C.Button>
            </C.ButtonGroup>
          </C.CardActions>
        </form>
      </C.CardContent>
    </GlassCard>
  );
};

export default UserInfoForm;

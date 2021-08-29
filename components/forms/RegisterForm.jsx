import React, { useState, useEffect, useRef } from "react";
import Router, { useRouter } from "next/router";
import Cookies from "js-cookie";

import * as C from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import ImageUpload from "../imageUpload";

const useStyles = C.makeStyles(() => ({
  formItem: {
    margin: "15px 0px",
    width: "100%",
  },
}));

const emailRegEx =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,2|3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/* register schemas */
const FORM_DATA_REGISTER = {
  username: {
    value: "",
    label: "Username",
    min: 6,
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
};

const RegisterForm = ({ origin, referer, baseApiUrl }) => {
  const uploadEl = useRef();
  const classes = useStyles();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [vis, setVis] = useState(false);
  const toggleVis = () => {
    setVis(!vis);
  };

  const [stateFormData, setStateFormData] = useState(FORM_DATA_REGISTER);
  const [stateFormError, setStateFormError] = useState([]);
  const [stateFormValid, setStateFormValid] = useState(false);
  const [stateFormMessage, setStateFormMessage] = useState({});

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

    /* validation handler */
    validationHandler(stateFormData, e);
  }

  function metaSubmit(e) {
    e.preventDefault();
    uploadEl.current.handleUpload(onSubmitHandler);
  }

  async function onSubmitHandler(profPicUrl) {
    // e.preventDefault();

    let data = { ...stateFormData };

    const isValid = validationHandler(stateFormData);

    if (isValid) {
      data = { ...data, username: data.username.value || "" };
      data = { ...data, email: data.email.value || "" };
      data = { ...data, password: data.password.value || "" };
      data = { ...data, profile_pic: profPicUrl || "" };

      const isValid = validationHandler(stateFormData);

      if (isValid) {
        setLoading(!loading);
        const registerApi = await fetch(`${baseApiUrl}/users`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).catch((error) => {
          console.error("Error:", error);
        });
        let result = await registerApi.json();
        if (result.status === "success") {
          //login redirect
          const loginApi = await fetch(`${baseApiUrl}/auth`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }).catch((error) => {
            console.error("Error:", error);
          });
          let result = await loginApi.json();
          if (result.success && result.token) {
            Cookies.set("token", result.token);
            Router.push("/SearchBulletins");
          } else {
            setStateFormMessage(result);
          }
        } else {
          setStateFormMessage(result);
        }
        setLoading(false);
      } else {
        console.log("BROKE");
      }
    }
  }

  function validationHandler(states, e) {
    const input = (e && e.target.name) || "";
    const errors = [];
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
    <form onSubmit={metaSubmit} className="form-register card" method="POST">
      <C.FormGroup row>
        <C.FormHelperText>
          {stateFormMessage.status === "error" && (
            <C.Typography variant="h4">{stateFormMessage.error}</C.Typography>
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
          placeholder="Username"
          readOnly={loading && true}
          value={stateFormData.username.value}
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
          placeholder="Email"
          readOnly={loading && true}
          defaultValue={stateFormData.email.value}
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
          type={vis ? "text" : "password"}
          id="password"
          name="password"
          placeholder="Password"
          readOnly={loading && true}
          defaultValue={stateFormData.password.value}
          InputProps={{
            endAdornment: (
              <C.InputAdornment position="end" onClick={toggleVis}>
                {vis ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </C.InputAdornment>
            ),
          }}
        />
        <C.FormHelperText>
          {stateFormError.password && stateFormError.password.hint}
        </C.FormHelperText>
      </C.FormGroup>

      {/* Image Upload */}
      <C.FormGroup row>
        <ImageUpload ref={uploadEl} baseApiUrl={baseApiUrl} />
      </C.FormGroup>

      <C.CardActions>
        <C.Button
          type="submit"
          color="secondary"
          variant="contained"
          style={{ width: "auto" }}
          disabled={loading || !stateFormValid}
        >
          {!loading ? "Register" : "Loading..."}
        </C.Button>
      </C.CardActions>
    </form>
  );
};

export default RegisterForm;

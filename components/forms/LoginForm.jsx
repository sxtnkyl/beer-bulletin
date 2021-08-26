import React, { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import Cookies from "js-cookie";
import * as C from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const useStyles = C.makeStyles(() => ({
  formItem: {
    margin: "15px 0px",
    width: "100%",
  },
}));

const emailRegEx =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,2|3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/* login schemas */
const FORM_DATA_LOGIN = {
  email: {
    value: "",
    label: "Email",
    min: 10,
    max: 36,
    required: true,
    validator: {
      regEx: emailRegEx,
      error: "Please insert valid email",
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
      error: "Please insert valid password",
    },
  },
};

const LoginForm = ({ origin, referer, baseApiUrl }) => {
  const classes = useStyles();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [vis, setVis] = useState(false);
  const toggleVis = () => {
    setVis(!vis);
  };

  const [stateFormData, setStateFormData] = useState(FORM_DATA_LOGIN);
  const [stateFormError, setStateFormError] = useState([]);
  const [stateFormMessage, setStateFormMessage] = useState({});
  //extra handler for notValid state
  const [stateFormValid, setStateFormValid] = useState(false);

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

    // validate onChange
    validationHandler(stateFormData, e);
  }

  async function onSubmitHandler(e) {
    e.preventDefault();

    let data = { ...stateFormData };
    data = { ...data, email: data.email.value || "" };
    data = { ...data, password: data.password.value || "" };

    //
    const isValid = validationHandler(stateFormData);

    if (isValid) {
      setLoading(!loading);
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
      setLoading(false);
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
        states[input].min > states[input].value.length
      ) {
        errors[input] = {
          hint: `Field ${states[input].label} min ${states[input].min}`,
          isInvalid: true,
        };
        isValid = false;
      }
      if (
        states[input].value &&
        states[input].max < states[input].value.length
      ) {
        errors[input] = {
          hint: `Field ${states[input].label} max ${states[input].max}`,
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
          if (field.value && field.min >= field.value.length) {
            errors[item[0]] = {
              hint: `Field ${field.label} min ${field.min}`,
              isInvalid: true,
            };
            isValid = false;
          }
          if (field.value && field.max <= field.value.length) {
            errors[item[0]] = {
              hint: `Field ${field.label} max ${field.max}`,
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
    <form className="form-login card" method="POST" onSubmit={onSubmitHandler}>
      <C.FormGroup row>
        <C.FormHelperText>
          {stateFormMessage.status === "error" && (
            <C.Typography variant="h4">{stateFormMessage.error}</C.Typography>
          )}
        </C.FormHelperText>
      </C.FormGroup>
      <C.FormGroup row>
        <C.TextField
          className={classes.formItem}
          label="Email"
          id="email"
          name="email"
          placeholder="Email"
          onChange={onChangeHandler}
          readOnly={loading && true}
          value={stateFormData.email.value}
        />
        <C.FormHelperText>
          {stateFormError.email && stateFormError.email.hint}
        </C.FormHelperText>
      </C.FormGroup>
      <C.FormGroup row>
        <C.TextField
          className={classes.formItem}
          label="Password"
          type={vis ? "text" : "password"}
          id="password"
          name="password"
          placeholder="Password"
          onChange={onChangeHandler}
          readOnly={loading && true}
          value={stateFormData.email.password}
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

      <C.CardActions>
        <C.Button
          type="submit"
          color="secondary"
          variant="contained"
          style={{ width: "auto" }}
          disabled={loading || !stateFormValid}
        >
          {!loading ? "Login" : "Loading..."}
        </C.Button>
      </C.CardActions>
    </form>
  );
};

export default LoginForm;

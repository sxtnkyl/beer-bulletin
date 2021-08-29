import React, { useState, useEffect } from "react";
import * as C from "@material-ui/core";

const useStyles = C.makeStyles((theme) => ({
  formItem: {
    margin: "15px 0px",
    width: "100%",
  },
  textArea: {
    width: "100%",
    resize: "none",
  },
}));

/* login schemas */
const FORM_DATA_POST = {
  title: {
    value: "",
    label: "Title",
    min: 8,
    max: 36,
    required: true,
    validator: null,

    // validator: {
    //   regEx: emailRegEx,
    //   error: "Please insert valid email",
    // },
  },
  content: {
    value: "",
    label: "Content",
    min: 0,
    max: 250,
    required: false,
    validator: null,
    // validator: {
    //   regEx: /^[a-z\sA-Z0-9\W\w]+$/,
    //   error: "Please insert valid password",
    // },
  },
  seeking: {
    value: false,
    // label: this.value ? "Seeking" : "Offering",
  },
};

export default function CreatePostForm(props) {
  const classes = useStyles();
  // lifted to bottomNav
  // const [loading, setLoading] = useState(false);
  const { loading, setLoading, stateFormValid, setStateFormValid } = props;

  const [stateFormData, setStateFormData] = useState(FORM_DATA_POST);
  const [stateFormError, setStateFormError] = useState([]);
  const [stateFormMessage, setStateFormMessage] = useState({});
  // lifted to bottomNav
  // const [stateFormValid, setStateFormValid] = useState(true);

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
    console.log("state data", data);

    data = { ...data, title: data.title.value || "" };
    data = { ...data, content: data.content.value || "" };
    data = { ...data, seeking: data.seeking.value };
    data = { ...data, open: true };
    data = { ...data, user_id: props.user.id || props.user.data.id };

    const isValid = validationHandler(stateFormData);

    if (isValid) {
      setLoading(!loading);
      const tradesApi = await fetch(`${props.baseApiUrl}/trades`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(props.setOpenToast(true))
        .catch((error) => {
          console.error("Error:", error);
        });
      setLoading(false);
      props.handleClose();
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
    <>
      <form
        id="create-post-form"
        className="form-post card"
        method="POST"
        onSubmit={onSubmitHandler}
      >
        <C.FormGroup row>
          <C.FormHelperText>
            {stateFormMessage.status === "error" && (
              <C.Typography variant="h4">{stateFormMessage.error}</C.Typography>
            )}
          </C.FormHelperText>
        </C.FormGroup>
        <C.FormGroup row>
          <C.FormControlLabel
            control={
              <C.Switch
                color="secondary"
                name="seeking"
                checked={stateFormData.seeking.value}
                onChange={() =>
                  setStateFormData({
                    ...stateFormData,
                    seeking: {
                      ...stateFormData["seeking"],
                      value: !stateFormData.seeking.value,
                    },
                  })
                }
              />
            }
            label={stateFormData.seeking.value ? "Seeking" : "Offering"}
            labelPlacement="top"
          />
        </C.FormGroup>

        <C.FormGroup row>
          <C.TextField
            className={classes.formItem}
            label="Title"
            id="post-title"
            name="title"
            placeholder="Title"
            onChange={onChangeHandler}
            readOnly={loading && true}
            value={stateFormData.title.value}
          />
          <C.FormHelperText>
            {stateFormError.title && stateFormError.title.hint}
          </C.FormHelperText>
        </C.FormGroup>
        <C.FormGroup row>
          <C.TextareaAutosize
            className={classes.textArea}
            label="Content"
            id="content"
            name="content"
            minRows={4}
            placeholder="Content"
            onChange={onChangeHandler}
            readOnly={loading && true}
            value={stateFormData.content.value}
          />
          <C.FormHelperText>
            {stateFormError.content && stateFormError.content.hint}
          </C.FormHelperText>
        </C.FormGroup>
        <br />
        <C.FormGroup row>
          <C.Button
            variant="contained"
            component="label"
            disabled={loading || !stateFormValid}
          >
            {!loading ? "Upload File" : "Loading..."}
            <input type="file" hidden />
          </C.Button>
        </C.FormGroup>
        <br />
        <C.CardActions>
          {/* <C.Button
          type="submit"
          color="secondary"
          variant="contained"
          style={{ width: "auto" }}
          disabled={loading || !stateFormValid}
        >
          {!loading ? "Post" : "Loading..."}
        </C.Button> */}
        </C.CardActions>
      </form>
    </>
  );
}

import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useForm, Controller } from "react-hook-form";

const defaultValues = {
  email: "",
};

const SignUpForm = () => {
  const { handleSubmit, control } = useForm({ defaultValues });

  const onSubmit = async (data) => {
    try {
      await Axios({
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        url: "/api/auth/signUp",
        data: data,
      }).then((res) => {
        setStatus("success");
      });
    } catch (error) {
      console.log(error);
      setStatus("error");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        as={
          <c.TextField id="email" label="Enter your Email" variant="outlined" />
        }
        name="email"
        control={control}
      />
    </form>
  );
};

export default SignUpForm;

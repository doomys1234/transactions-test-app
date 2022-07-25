import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/auth/authSlice";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Title from "../Title/Title";
import s from "./Form.module.scss";
import { getError } from "../../redux/auth/authSelectors";
import { Button } from '@chakra-ui/react'

import Input from "../Input/Input";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => getError(state));

  const onSubmit = (data) => {
    clearForm();
    dispatch(registerUser(data));
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Welcome on a board");
    navigate("/login");
  };

  const clearForm = () => {
    resetField("name");
    resetField("email");
    resetField("password");
  };

  return (
    <>
      <Title title={"Register to our app"} />

      <div className={s.container}>
        <form
          className={s.form}
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <Input label={"name"} register={register} required={"This is required"} placeholder={"Name"} />
          <p>{errors.name?.message}</p>
          <Input label={"email"} register={register} required={"This is required"} placeholder={"Email"} />
          <p>{errors.email?.message}</p>
          <Input label={"password"} register={register} required={"This is required"} placeholder={"Password"} />
          <p>{errors.password?.message}</p>
          <Button colorScheme='blue' size='md' ml={"auto"} mr={"auto"} w={150} type="submit">Submit</Button>
        </form>
      </div>
    </>
  );
}

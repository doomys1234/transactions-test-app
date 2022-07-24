import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginUser } from "../../redux/auth/authSlice";
import { getError } from "../../redux/auth/authSelectors";
import { useForm } from "react-hook-form";
import Input from "../Input/Input";
import Title from "../Title/Title";
import s from "./Form.module.scss";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => getError(state));

  const onSubmit = (data) => {
    dispatch(loginUser(data));
    if (error) {
      toast.error(error.message);
      return;
    }
    navigate("/");
    toast.success("You successfully logged in");
    clearForm();
  };

  const clearForm = () => {
    resetField("email");
    resetField("password");
  };

  return (
    <>
      <Title title={"Please log in to our app"} />

      <div className={s.container}>
        <form
          className={s.form}
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <Input
            label={"email"}
            register={register}
            required={"This is required"}
            placeholder={"Email"}
          />
          <p>{errors.email?.message}</p>
          <Input
            label={"password"}
            register={register}
            required={"This is required"}
            placeholder={"Password"}
          />
          <p>{errors.password?.message}</p>
          <button className={s.button} type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
    //     <>
    //         <Title title={"Please log in to our app"} />
    //        <div className={s.container}>
    //   <form className={s.form} onSubmit={handleSubmit} autoComplete="off">
    //     <label className={s.label}>
    //       Email
    //       <input
    //         className={s.input}
    //         onChange={handleChange}
    //         type={email}
    //         name="email"
    //         autoFocus
    //         value={email}
    //       ></input>
    //     </label>
    //     <label className={s.label}>
    //       Password
    //       <input
    //         className={s.input}
    //         onChange={handleChange}
    //         type={password}
    //         name="password"
    //         autoFocus
    //         value={password}
    //       ></input>
    //     </label>
    //     <button className={s.button} type="submit">
    //       Submit
    //     </button>
    //   </form>
    // </div>
    //    </>
  );
}

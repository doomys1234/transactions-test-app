import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/auth/authSlice";
import { toast } from 'react-toastify';
import Title from "../Title/Title"
import s from './RegisterPage.module.scss'
import { getError } from "../../redux/auth/authSelectors";
export default function RegisterPage() {

const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
    const navigate = useNavigate()
    const error = useSelector(state=>getError(state))


  

  const handleChange = e => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        return;
    }
  };
    
    const handleSubmit = e => {
        e.preventDefault();
        if (name==="" || email === "" || password === "") {
            toast.warn('Please fill all fields')
            return
        }
        dispatch(registerUser({ name, email, password }));
        if (error) {
            toast.error(error.message)
            return
        }
        toast.success("Welcome on a board")
    navigate('/login')
    setName('');
    setEmail('');
    setPassword('');
  };
    
    return (
    <>
                 <Title title={"Register to our app"} />
   
            <div className={s.container}>
      <form className={s.form} onSubmit={handleSubmit} autoComplete="off">
        <label className={s.label}>
          Name
          <input
            className={s.input}
            onChange={handleChange}
            type={name}
            name="name"
            autoFocus
            value={name}
          ></input>
        </label>
        <label className={s.label}>
          Email
          <input
            className={s.input}
            onChange={handleChange}
            type={email}
            name="email"
            autoFocus
            value={email}
          ></input>
        </label>
        <label className={s.label}>
          Password
          <input
            className={s.input}
            onChange={handleChange}
            type={password}
            name="password"
            autoFocus
            value={password}
          ></input>
        </label>
        <button className={s.button} type="submit">
          Submit
        </button>
      </form>
    </div>
    </>
    )
}
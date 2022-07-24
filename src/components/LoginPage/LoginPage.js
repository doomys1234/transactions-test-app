import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { loginUser } from '../../redux/auth/authSlice';
import {getError} from '../../redux/auth/authSelectors';
import Title from "../Title/Title"
import s from './Form.module.scss'

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector(state => getError(state))

    const handleChange = e => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        switch (name) {
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
        if (email === "" || password === "") {
            toast.warn('Please fill all fields')
            return
        }
        dispatch(loginUser({ email, password }));
        if (error) {
            toast.error(error.message)
            return
        }
        navigate('/')
        toast.success("You successfully logged in")
        setEmail('');
        setPassword('');
    }
    
    return (
        <>
            <Title title={"Please log in to our app"} />
           <div className={s.container}>
      <form className={s.form} onSubmit={handleSubmit} autoComplete="off">
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
import { NavLink } from "react-router-dom";
import { logOutUser } from "../../redux/auth/authSlice";
import { Heading } from '@chakra-ui/react'
import {
  getError,
  getStatus,
  getUsername,
} from "../../redux/auth/authSelectors";
import { useSelector, useDispatch } from "react-redux";
import s from "./Header.module.scss";
import { toast } from "react-toastify";
import { useEffect } from "react";
import storage from "redux-persist/lib/storage";
export default function Header() {
  const isLoggedIn = useSelector((state) => getStatus(state));
  const username = useSelector((state) => getUsername(state));
  const error = useSelector((state) => getError(state));
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  const handleLogOut = () => {
    dispatch(logOutUser());
    storage.removeItem('persist:root')
    if (error) {
      return;
    }
    toast.success("You successfully logged out");
  };
  return (
    <header className={s.container}>
      <div className={s.wrapper}>
        <Heading as='h1' size='lg'className={s.title}>MoneyBook</Heading>
        <NavLink
          end
          to="/"
          className={({ isActive }) =>
            isActive ? `${s.active_link}` : `${s.link}`
          }
        >
          Home
        </NavLink>
        {isLoggedIn && (
          <NavLink
            end
            to="/transactions"
            className={({ isActive }) =>
              isActive ? `${s.active_link}` : `${s.link}`
            }
          >
            Transactions
          </NavLink>
        )}
      </div>

      <div className={s.user}>
        {isLoggedIn ? (
          <p className={s.welcome}>Welcome, {username}</p>
        ) : (
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? `${s.active_link}` : `${s.link}`
            }
          >
            Sign in
          </NavLink>
        )}

        {isLoggedIn ? (
          <NavLink
            to="/login"
            onClick={handleLogOut}
            className={({ isActive }) =>
              isActive ? `${s.active_link}` : `${s.link}`
            }
          >
            Log out
          </NavLink>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? `${s.active_link}` : `${s.link}`
            }
          >
            Log in
          </NavLink>
        )}
      </div>
    </header>
  );
}

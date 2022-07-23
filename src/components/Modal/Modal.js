import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { modalToggle } from "../../redux/data/dataSlice";
import s from "./Modal.module.scss";

export default function Modal() {
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      dispatch(modalToggle());
    }
  };

    const onBackdropClose = (e) => {
        if (e.target.id === 'backdrop') {
          dispatch(modalToggle());
      }
   
    
  };
  return (
    <>
      <div className={s.overlay} onClick={onBackdropClose} id='backdrop'>
        <div className={s.modal}>
          <p className={s.text}>
            Are you sure you want to delete this transaction?
          </p>
          <div className={s.wrapper}>
            <button className={s.button} type="button">Yes</button>
            <button className={s.button}type="button">No</button>
          </div>
        </div>
      </div>
    </>
  );
}

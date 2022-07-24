import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  getEditModal,
  getFileData,
  getInitialData,
  getShowModal,
  getTransaction,
  getTransactionStatus,
} from "../../redux/data/dataSelectors";
import {
  deleteDataFile,
  deleteInitialData,
  modalToggle,
  editModalToggle,
  setTransactionStatus,
  setData,
  setInitialData,
} from "../../redux/data/dataSlice";
import s from "./Modal.module.scss";

export default function Modal({ saveButton, cancelButton, text }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname;
  const showEditModal = useSelector((state) => getEditModal(state));
  const showModal = useSelector((state) => getShowModal(state));
  const transaction = useSelector((state) => getTransaction(state));
  const dataFile = useSelector((state) => getFileData(state));
  const initialData = useSelector((state) => getInitialData(state));

  const transactionStatus = useSelector((state) => getTransactionStatus(state));

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });
  const closeModal = () => {
    if (showModal) {
      dispatch(modalToggle());
      return;
    }

    if (showEditModal) {
      dispatch(editModalToggle());
      return;
    }
  };

  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      closeModal();
    }
  };

  const onBackdropClose = (e) => {
    if (e.target.id !== "backdrop") {
      return;
    }
    closeModal();
  };

  const mapNewData = (arr) => {
    return arr.map((item) => {
      if (item.TransactionId === transaction.TransactionId) {
        return { ...item, Status: transactionStatus };
      }
      return item;
    });
  };

  const onAgreeClick = (e) => {
    switch (path) {
      case "/transactions":
        if (e.target.textContent === "Save") {
          const newData = mapNewData(initialData);
          dispatch(setInitialData(newData));
          closeModal();
          return;
        }
        dispatch(deleteInitialData(transaction.TransactionId));
        closeModal();

        break;
      case "/":
        if (e.target.textContent === "Save") {
          const newData = mapNewData(dataFile);
          dispatch(setData(newData));
          closeModal();
          return;
        }
        dispatch(deleteDataFile(transaction.TransactionId));
        closeModal();

        break;

      default:
        break;
    }
  };

  const onSelectChange = (e) => {
    const selectorStatus = e.target.value;
    dispatch(setTransactionStatus(selectorStatus));
  };
  return (
    <>
      <div className={s.overlay} onClick={onBackdropClose} id="backdrop">
        <div className={s.modal}>
          <p className={s.text}>
            {text || "Are you sure you want to delete this transaction?"}
          </p>
          {showEditModal && (
            <div className={s.label}>
              <label htmlFor="status">Choose :</label>

              <select
                className={s.selector}
                name="status"
                id="status"
                onChange={onSelectChange}
              >
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          )}
          <div className={s.wrapper}>
            <button
              className={s.button}
              type="button"
              id="agree"
              onClick={onAgreeClick}
            >
              {saveButton || "Yes"}
            </button>
            <button
              className={s.button}
              type="button"
              id="disagree"
              onClick={closeModal}
            >
              {cancelButton || "No"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

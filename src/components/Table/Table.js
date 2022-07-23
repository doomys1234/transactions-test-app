import { useDispatch, useSelector } from "react-redux";
import {
  getTransaction,
  getTransactionStatus,
} from "../../redux/data/dataSelectors";
import {
  setTransaction,
  modalToggle,
  editModalToggle,
  setTransactionStatus,
} from "../../redux/data/dataSlice";
import s from "./Table.module.scss";

export default function Table({ dataInfo }) {
  const dispatch = useDispatch();

  const onDeleteClick = (id) => {
    dispatch(modalToggle());
    dataInfo.forEach((item) => {
      if (item.TransactionId === id) {
        dispatch(setTransaction(item));
      }
    });
  };

  const onEditClick = (id) => {
    dispatch(editModalToggle());
    dispatch(setTransactionStatus("Successful"));
    dataInfo.forEach((item) => {
      if (item.TransactionId === id) {
        dispatch(setTransaction(item));
      }
    });
  };

  return (
    <>
      <table className={s.table}>
        <thead>
          <tr>
            <th className={s.table_header}>Type</th>
            <th className={s.table_header}>Status</th>
            <th className={s.table_header}>Client Name</th>
            <th className={s.table_header}>Amount</th>
            <th className={s.table_header}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dataInfo.map((item) => (
            <tr key={item.TransactionId || item.id}>
              <td>{item.Type}</td>
              <td>{item.Status || "Successful"}</td>
              <td>{item.ClientName}</td>
              <td>{item.Amount}$</td>
              <td>
                <button
                  onClick={() => {
                    onEditClick(item.TransactionId);
                  }}
                  type="button"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    onDeleteClick(item.TransactionId);
                  }}
                  type="button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Papa from "papaparse";
import {
  setTransaction,
  modalToggle,
  editModalToggle,
  setTransactionStatus,
  filterDataFile,
  filterInitialData,
  getData,
} from "../../redux/data/dataSlice";
import PropTypes from "prop-types";
import s from "./Table.module.scss";
import {
  getFilteredItems,
  getInitialData,
} from "../../redux/data/dataSelectors";

export default function Table({ dataInfo }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname;
  const filteredItems = useSelector((state) => getFilteredItems(state));
  const initialData = useSelector((state) => getInitialData(state));

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
    dispatch(setTransactionStatus("Completed"));
    dataInfo.forEach((item) => {
      if (item.TransactionId === id) {
        dispatch(setTransaction(item));
      }
    });
  };

  const onSelectChange = (e) => {
    const selectorStatus = e.target.value;
    dispatch(setTransactionStatus(selectorStatus));
    if (selectorStatus === "No filter") {
      dispatch(filterDataFile(selectorStatus));
      dispatch(getData());
      return;
    }
    if (path === "/") {
      dispatch(filterDataFile(selectorStatus));
      return;
    }

    dispatch(filterInitialData(selectorStatus));
  };

  const onExportClick = () => {
    let csv;
    switch (path) {
      case "/transactions":
        csv = Papa.unparse(initialData);
        makeFile(csv);
        break;

      case "/":
        csv = Papa.unparse(filteredItems);
        makeFile(csv);
        break;

      default:
        break;
    }
  };

  const makeFile = (csv) => {
    const blob = new Blob(["\ufeff", csv]);
    let csvURL = window.URL.createObjectURL(blob);
    let tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.setAttribute("download", "text.csv");
    tempLink.click();
  };

  return (
    <div>
      <div className={s.label}>
        <label htmlFor="status">Choose :</label>

        <select
          className={s.selector}
          name="status"
          id="status"
          onChange={onSelectChange}
        >
          <option value="No filter">No filter</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <button className={s.button} type="button" onClick={onExportClick}>
          Export file
        </button>
      </div>
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
              <td>{item.Status}</td>
              <td>{item.ClientName}</td>
              <td>{item.Amount}$</td>
              <td>
                <div className={s.wrapper}>
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
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

Table.propTypes = {
  dataInfo: PropTypes.array,
};

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
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Select,
  Button
} from '@chakra-ui/react'
import PropTypes from "prop-types";
import s from "./Table.module.scss";
import {
  getFilteredItems,
  getInitialData,
} from "../../redux/data/dataSelectors";

export default function TablePage({ dataInfo }) {
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
      <div className={s.wrap}>
        <Select
          className={s.selector}
          size='md'
          w={200}
          name="status"
          id="status"
          onChange={onSelectChange}
        >
          <option value="No filter">No filter</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
          <option value="Cancelled">Cancelled</option>
        </Select>
        <Button className={s.button} type="button" onClick={onExportClick} size={"md"} colorScheme='blue' ml={7}>
          Export file
        </Button>
      </div>
      <TableContainer>
        <Table className={s.table} w={900}>
          <Thead >
          <Tr >
            <Th className={s.table_header}>Type</Th>
            <Th className={s.table_header}>Status</Th>
            <Th className={s.table_header}>Client Name</Th>
            <Th className={s.table_header}>Amount</Th>
            <Th className={s.table_header}>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {dataInfo.map((item) => (
            <Tr key={item.TransactionId || item.id}>
              <Td>{item.Type}</Td>
              <Td>{item.Status}</Td>
              <Td>{item.ClientName}</Td>
              <Td>{item.Amount}$</Td>
              <Td>
                <div className={s.wrapper}>
                  <Button
                    size={'md'}
                    onClick={() => {
                      onEditClick(item.TransactionId);
                    }}
                    type="button"
                    colorScheme='blue'
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      onDeleteClick(item.TransactionId);
                    }}
                    type="button"
                    colorScheme='blue'
                  >
                    Delete
                  </Button>
                </div>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      </TableContainer>
    </div>
  );
}

Table.propTypes = {
  dataInfo: PropTypes.array,
};

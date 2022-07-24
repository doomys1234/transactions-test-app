import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getStatus } from "../../redux/auth/authSelectors";
import { setData, setFileName } from "../../redux/data/dataSlice";
import {
  getCurrentPage,
  getEditModal,
  getFileData,
  getFileName,
  getFileStatus,
  getFilteredItems,
  getShowModal,
} from "../../redux/data/dataSelectors";
import Papa from "papaparse";
import { Button } from '@chakra-ui/react'

import icon from "../../images/icon.png";
import s from "./HomePage.module.scss";
import Title from "../Title/Title";
import { toast } from "react-toastify";
import TablePage from "../Table/Table";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";

export default function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isFileLoaded = useSelector((state) => getFileStatus(state));
  const isLoggedIn = useSelector((state) => getStatus(state));
  const dataFile = useSelector((state) => getFileData(state));
  const fileName = useSelector((state) => getFileName(state));
  const currentPage = useSelector((state) => getCurrentPage(state));
  const showModal = useSelector((state) => getShowModal(state));
  const showEditModal = useSelector(state => getEditModal(state));
  const filteredItems = useSelector(state => getFilteredItems(state));


 
  const uploadClick = (e) => {
    if (e.target.files.length) {
      const inputFile = e.target.files[0];
      const fileExtension = inputFile.type.split("/")[1];
      if (fileExtension !== "csv") {
        toast.warn("Please upload CSV file");
        return;
      }

      dispatch(setFileName(inputFile.name));
      parseFile(inputFile);
    }
  };
  const parseFile = (inputFile) => {
    Papa.parse(inputFile, {
      header: true,
      complete: function (results) {
        dispatch(setData(results.data));
      },
    });
  };

  const onTryClick = () => {
    navigate("/register");
  };

  const paginate = (array, arrSize, pageNumber) => {
    return array.slice((pageNumber - 1) * arrSize, pageNumber * arrSize);
  };

  const perPage = 10;
  const paginatedArray = paginate(filteredItems, perPage, currentPage);
  const lengthOfArr = Math.ceil(filteredItems.length / perPage)

  return (
    <>
      {!isLoggedIn && (
        <>
          <Title title={"Welcome to our app"} />
          <div className={s.container}>
            <p className={s.text}>
              Here you can upload the history of your transactions and manage
              them
            </p>
            <Button size={"md"} colorScheme='blue' w={"150px"} className={s.button} type="button" onClick={onTryClick}>
              Try it now
            </Button>
          </div>
        </>
      )}
      {isLoggedIn && !isFileLoaded && (
        <>
          <Title title={"Upload your file "} />
          <div className={s.container}>
            <img className={s.image} src={icon} alt="csv icon" />
            <form>
              <label className={s.label} htmlFor="file-upload">
                Upload file
              </label>
              <input onChange={uploadClick} id="file-upload" type="file" />
            </form>
          </div>
        </>
      )}
      {isFileLoaded && (
        <>
          <Title title={fileName} />
          <TablePage dataInfo={paginatedArray} />
          <Pagination data={dataFile.length} lengthOfArr={lengthOfArr} />
        </>
      )}
      {showModal && <Modal />}
      {showEditModal && <Modal saveButton={'Save'} cancelButton={'Cancel'} text={'Please update the status'} />}
    </>
  );
}

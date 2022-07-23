import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getStatus } from "../../redux/auth/authSelectors";
import { setData, setFileName } from "../../redux/data/dataSlice";
import {
  getCurrentPage,
  getFileData,
  getFileName,
  getFileStatus,
  getShowModal,
} from "../../redux/data/dataSelectors";
import Papa from "papaparse";

import icon from "../../images/icon.png";
import s from "./HomePage.module.scss";
import Title from "../Title/Title";
import { toast } from "react-toastify";
import Table from "../Table/Table";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";

export default function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isFileLoaded = useSelector((state) => getFileStatus(state));
  const isLoggedIn = useSelector((state) => getStatus(state));
  const dataFile = useSelector((state) => getFileData(state));
  const fileName = useSelector((state) => getFileName(state));
  const currentPage = useSelector(state => getCurrentPage(state));
  const showModal = useSelector(state => getShowModal(state));

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
  }


  const perPage = 10
  const paginatedArray = paginate(dataFile, perPage, currentPage)
  const lengthOfArr = dataFile.length/ perPage

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
            <button className={s.button} type="button" onClick={onTryClick}>
              Try it now
            </button>
          </div>
        </>
      )}
      {isLoggedIn || !isFileLoaded && (
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
          <Table dataInfo={paginatedArray} />
          <Pagination data={dataFile.length} lengthOfArr={lengthOfArr} />
        </>
      )}
      {showModal && (
        <Modal/>
      )}
    </>
  );
}

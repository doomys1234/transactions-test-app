import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getStatus } from "../../redux/auth/authSelectors";
import { getData } from "../../redux/data/dataSlice";
import MoonLoader from "react-spinners/MoonLoader"
import {
  getDataStatus,
  getEditModal,
  getInitialData,
  getShowModal,
} from "../../redux/data/dataSelectors";
import Title from "../Title/Title";
import TablePage from "../Table/Table";
import Modal from "../Modal/Modal";

const override = {
  display: "block",
  margin: "40 auto",
};

export default function Transactions() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => getStatus(state));
  const initialData = useSelector((state) => getInitialData(state));
  const isLoaded = useSelector((state) => getDataStatus(state));
  const showModal = useSelector((state) => getShowModal(state));
  const showEditModal = useSelector((state) => getEditModal(state));

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      toast.warn("Please login to your account");
      return;
    }
    if (isLoaded) {
      return;
    }

    dispatch(getData());
  }, [isLoggedIn, isLoaded]);
  return (
    <>
      {initialData.length === 0 ? (
        <Title title={"No transactions "} />
      ) : (
        <Title title={"Your recent transactions"} />
      )}
      {!isLoaded && <MoonLoader color={"blue"} cssOverride={override} loading={!isLoaded} size={50} />
}
      {isLoaded && <TablePage dataInfo={initialData} />}
      {showModal && <Modal />}
      {showEditModal && (
        <Modal
          saveButton={"Save"}
          cancelButton={"Cancel"}
          text={"Please update the status"}
        />
      )}
    </>
  );
}

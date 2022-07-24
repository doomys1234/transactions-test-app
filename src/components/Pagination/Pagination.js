import { useDispatch, useSelector } from "react-redux";
import { getCurrentPage } from "../../redux/data/dataSelectors";
import { incrementPage, decrementPage } from "../../redux/data/dataSlice";
import { Button } from "@chakra-ui/react";
import PropTypes from "prop-types";

import s from "./Pagination.module.scss";
export default function Pagination({ lengthOfArr }) {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => getCurrentPage(state));
  const incrementClick = () => {
    if (currentPage >= lengthOfArr) {
      return;
    }
    dispatch(incrementPage());
  };
  const decrementClick = () => {
    if (currentPage <= 1) {
      return;
    }
    dispatch(decrementPage());
  };

  return (
    <>
      <div>
        <div className={s.wrapper}>
          <Button
            size={"md"}
            colorScheme="blue"
            className={s.button}
            type="button"
            onClick={decrementClick}
          >
            Prev page
          </Button>
          <span>
            {currentPage} out of {lengthOfArr}
          </span>
          <Button
            size={"md"}
            colorScheme="blue"
            className={s.button}
            type="button"
            onClick={incrementClick}
          >
            Next page
          </Button>
        </div>
      </div>
    </>
  );
}

Pagination.propTypes = {
  lengthOfArr: PropTypes.number,
};

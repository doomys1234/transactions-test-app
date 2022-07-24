import s from "./Title.module.scss";
import PropTypes from "prop-types";
export default function Title({ title }) {
  return <h2 className={s.text}>{title}</h2>;
}

Title.propTypes = {
  text: PropTypes.string,
};

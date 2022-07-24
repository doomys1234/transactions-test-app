import { Heading } from '@chakra-ui/react'
import s from "./Title.module.scss";
import PropTypes from "prop-types";
export default function Title({ title }) {
  return <Heading as='h2' size='lg' className={s.text}>{title}</Heading>;
}

Title.propTypes = {
  text: PropTypes.string,
};

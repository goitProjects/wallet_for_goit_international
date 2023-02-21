import { PropTypes } from "prop-types";

import s from "./Container.module.scss";

const Container = ({ children, className = "" }) => {
  return <div className={`${s.container} ${className}`}>{children}</div>;
};
Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Container;

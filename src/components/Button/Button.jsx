import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import s from "./Button.module.scss";

export const STYLE_TYPE = {
  MAIN: "main",
  SECONDARY: "secondary",
};

const Button = ({
  className = "",
  type = "button",
  styleType = "main",
  text,
  onClick,
  disabled = false,
  to = "/",
}) => {
  if (type === "link")
    return (
      <Link to={to} className={`${s[styleType]} ${className}`}>
        {text}
      </Link>
    );
  return (
    <button
      className={`${s[styleType]} ${className}`}
      type={type}
      onClick={onClick ? onClick : null}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  styleType: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  to: PropTypes.string,
};

export default Button;

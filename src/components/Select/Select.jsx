import { useEffect, useState } from "react";
import { useField } from "formik";
import PropTypes from "prop-types";

import useClickOutside from "assets/hooks/useClickOutside";

import s from "./Select.module.scss";

const Select = ({ options, containerClassName = "", name, setFieldValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [field] = useField({ name });

  useEffect(() => {
    if (!isOpen) return;

    const onEsc = (e) => {
      if (e.code === "Escape") closeList();
    };

    window.addEventListener("keydown", onEsc);

    return () => {
      window.removeEventListener("keydown", onEsc);
    };
  }, [isOpen]);

  const openList = (e) => {
    if (e.target !== e.currentTarget) return;
    setIsOpen(true);
  };

  const closeList = () => {
    setIsOpen(false);
  };

  const listRef = useClickOutside(closeList);

  const selectField = (value) => {
    setFieldValue(field.name, value);
    closeList();
  };

  return (
    <div
      className={`${containerClassName} ${s.container}`}
      style={{ borderBottomColor: isOpen ? "#24cca7" : null }}
      onClick={openList}
    >
      {options?.find(([value]) => value === field.value)?.at(1)}
      {isOpen && (
        <div className={s.wrapper}>
          <ul className={s.list} ref={listRef}>
            {options.map(([value, text]) => (
              <li
                key={value}
                onClick={() => selectField(value)}
                className={s.item}
                tabIndex={0}
              >
                {text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  ).isRequired,
  containerClassName: PropTypes.string,
  name: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};
export default Select;

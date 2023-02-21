import s from "./SelectorsOption.module.scss";

const SelectorsOption = ({ onOptionClick, isDisabled, title }) => {
  return (
    <option
      disabled={!isDisabled}
      key={title}
      className={`${s.item}`}
      onClick={onOptionClick}
      style={isDisabled ? { color: "black" } : { color: "#D0D0D0" }}
    >
      {title}
    </option>
  );
};

export default SelectorsOption;

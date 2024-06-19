import React from "react";

const Input = ({ inputLabel, inputName, inputType, inputValue, inputChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={inputName}>{inputLabel}</label>
      <input name={inputName} type={inputType} value={inputValue} onChange={inputChange} />
    </div>
  );
};

export default Input;

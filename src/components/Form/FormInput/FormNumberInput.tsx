import React from 'react';

type FormNumberInputProps = {
  value: string;
  label: string;
  name: string;
  handleInput: (event: any) => void;
};

const FormNumberInput = (props: FormNumberInputProps) => {
  const {
    value,
    label,
    name,
    handleInput,
  } = props;

  return (
    <label htmlFor={name}>
      <div className={`input_content number ${name}`}>
        <input
          type="number"
          placeholder={label}
          value={value}
          onChange={handleInput}
          name={name}
          id={name}
          min="0"
          className={`input ${name}`}
        />
      </div>
    </label>
  );
};

export default FormNumberInput;

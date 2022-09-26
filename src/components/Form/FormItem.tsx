import React, { useEffect } from 'react';
import FormTextInput from './FormInput/FormTextInput';
import FormSelectInput from './FormInput/FormSelectInput';

type FormItemProps = {
  inputType: string;
  value: any,
  label: string;
  name: string;
  options: any;
  handleInput: (event: any) => void;
  readOnly: boolean | undefined;
  handleButton: () => void;
};

const FormItem = (props: FormItemProps) => {
  const {
    inputType,
    value,
    label,
    name,
    options,
    handleInput,
    handleButton,
    readOnly,
  } = props;

  useEffect(() => {
    if (readOnly) {
      const element = document.getElementById(label);
      element?.setAttribute('readonly', '');
      element?.setAttribute('disabled', '');
    }
    if (!readOnly) {
      const element = document.getElementById(label);
      element?.removeAttribute('readonly');
      element?.removeAttribute('disabled');
    }
  }, [readOnly]);

  return (
    <div className="form_input">
      {
        inputType === 'text'
        && (
          <FormTextInput
            value={value}
            label={label}
            name={name}
            handleInput={handleInput}
            handleButton={handleButton}
          />
        )
      }
      {
        inputType === 'select'
        && (
          <FormSelectInput
            value={value}
            label={label}
            name={name}
            options={options}
            handleInput={handleInput}
          />
        )
      }
      {/* ADD ANOTHER INPUT  */}
    </div>
  );
};

export default FormItem;

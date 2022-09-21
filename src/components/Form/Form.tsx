import React from 'react';
import FormSubmit from './FormSubmit';
import FormItem from './FormItem';

import './Form.scss';

type FormRequiredProps = {
  formType: string;
  items: any[];
  values: any;
  handleInput: (event: any) => void;
};

type FormOptionalProps = {
  // eslint-disable-next-line react/require-default-props
  handleSubmitButton?: () => void;
  haveSubmitButton?: boolean;
  readOnly?: boolean;
};

interface FormProps
  extends FormRequiredProps,
  FormOptionalProps {}

const defaultProps: FormOptionalProps = {
  haveSubmitButton: false,
  readOnly: false,
};

const Form = (props: FormProps) => {
  const {
    formType,
    items,
    values,
    handleInput,
    handleSubmitButton,
    haveSubmitButton,
    readOnly,
  } = props;

  const handleButton = (name: any) => {
    if (handleSubmitButton) {
      handleSubmitButton();
    }
    console.log(name);
  };

  return (
    <form
      className={`form ${formType}`}
      onSubmit={handleSubmitButton}
    >
      {
        items.map(
          (item) => (
            <FormItem
              key={`${formType}-${item.name}`}
              inputType={item.inputType}
              value={values[item.name]}
              label={item.label}
              name={item.name}
              options={item.options}
              handleInput={handleInput}
              handleButton={() => handleButton(item.name)}
              readOnly={readOnly}
            />
          ),
        )
      }
      {
        haveSubmitButton
        && (
          <FormSubmit />
        )
      }
    </form>
  );
};

Form.defaultProps = defaultProps;

export default Form;

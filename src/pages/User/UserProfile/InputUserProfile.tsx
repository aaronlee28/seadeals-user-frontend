import React, { FC, useEffect, useState } from 'react';
import dateFormatter from '../../../utils/dateFormatter';

const InputUserProfile:FC<any> = ({
  name, data, handleChange, isChangeable, typeElement,
}) => {
  const [value, setValue] = useState('');

  const displayDatetime = (time: string) => {
    const { length } = time;
    return time.replace('T', ' ').substring(0, length - 10);
  };

  useEffect(() => {
    if (isChangeable) {
      if (typeElement === 'date') {
        setValue(displayDatetime(data));
      }
    } else if (!isChangeable && typeElement === 'date') {
      const tmp = dateFormatter(data, false);
      setValue(tmp);
    }
  }, [data, isChangeable]);

  return (
    <div className="my-2">
      <p className="caption-input">{name.replace('_', ' ')}</p>
      <input
        className="form-control"
        name={name}
        value={value || data}
        type={isChangeable ? typeElement : 'text'}
        onChange={handleChange}
        disabled={!isChangeable}
        readOnly={!isChangeable}
      />
    </div>
  );
};

export default InputUserProfile;

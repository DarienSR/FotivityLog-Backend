import { useState } from 'react';

export const useCheckbox = initialValue => {
  const [value, setValue] = useState(initialValue); 
  return {
    value,
    setValue,
    reset: () => setValue(false),
    bind: {
      value,
      onChange: event => {
        setValue(event.target.checked);
      }
    }
  }
}
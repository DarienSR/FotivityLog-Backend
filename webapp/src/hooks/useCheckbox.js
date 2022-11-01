import { useState } from 'react';

export const useCheckbox = initialValue => {
  const [value, setValue] = useState(initialValue); 


  if(value === true) console.log(value, typeof(value))

  return {
    value,
    setValue,
    reset: () => setValue(false),
    bind: {
      value,
      onChange: event => {
        setValue(event.target.value);
      }
    }
  }
}
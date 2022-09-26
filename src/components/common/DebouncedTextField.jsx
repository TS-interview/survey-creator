import React, { useCallback, useEffect, useState } from 'react';

import { Input } from '@chakra-ui/react';
import { FastField, useField, useFormikContext } from 'formik';
import { useDebouncedCallback } from 'use-debounce';

const INPUT_DELAY = 200;

// Under construction: Does not work at the moment
const DebouncedTextField = ({ name }) => {
  const [field, helpers] = useField(name);
  const [innerValue, setInnerValue] = useState(field.value);

  const debouncedHandleOnChange = useDebouncedCallback((event) => {
    helpers.setValue(name, event);
  }, INPUT_DELAY);

  const handleOnChange = useCallback((event) => {
    event.persist();

    const newValue = event.currentTarget.value;
    setInnerValue(newValue);
    debouncedHandleOnChange(event);
  }, []);

  return (
    <FastField
      as={Input}
      name={name}
      inputProps={{ handleOnChange }}
      w="200px"
    />
  );
};

export default DebouncedTextField;

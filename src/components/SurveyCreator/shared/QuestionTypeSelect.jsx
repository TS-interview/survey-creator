import React from 'react';

import { Select } from '@chakra-ui/react';
import { useField, useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';

import { QUESTION_TYPES } from '../constants';

const QuestionTypeSelect = ({ index, name, previousType }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  const onChangeHandler = (e) => {
    if (
      previousType === QUESTION_TYPES.multipleChoice.id &&
      e.target.value !== QUESTION_TYPES.multipleChoice.id
    ) {
      setFieldValue(`questionList.${index}.options`, null);
    } else if (
      e.target.value === QUESTION_TYPES.multipleChoice.id &&
      previousType !== QUESTION_TYPES.multipleChoice.id
    ) {
      setFieldValue(`questionList.${index}.options`, [
        { id: uuid(), label: 'Option' },
      ]);
    }
    field.onChange(e);
  };

  return (
    <Select
      bg="gray.50"
      data-testid="questionTypeSelect"
      isRequired
      onChange={onChangeHandler}
      placeholder="Select type"
      w="200px"
      {...field}
    >
      {Object.values(QUESTION_TYPES).map((type) => (
        <option key={type.id} value={type.id}>
          {type.label}
        </option>
      ))}
    </Select>
  );
};

QuestionTypeSelect.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  previousType: PropTypes.string.isRequired,
};

export default QuestionTypeSelect;

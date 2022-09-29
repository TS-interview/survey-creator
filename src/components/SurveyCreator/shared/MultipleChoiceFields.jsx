import React from 'react';

import { Flex, Icon, Input } from '@chakra-ui/react';
import { FastField, FieldArray, useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import { ImRadioUnchecked } from 'react-icons/im';
import uuid from 'react-uuid';

import FormButtonPanel from './FormButtonPanel';

const MultipleChoiceField = ({
  hasMany,
  index,
  insertHandler,
  notLast,
  optionIndex,
  removeHandler,
}) => {
  return (
    <Flex justify="space-between" mb={notLast ? '16px' : '0'} w="100%">
      <Flex align="center">
        <Icon as={ImRadioUnchecked} mr="8px" />
        <FastField
          as={Input}
          bg="gray.50"
          name={`questionList.${index}.options.${optionIndex}.label`}
          w="200px"
        />
      </Flex>
      <FormButtonPanel
        addHandler={insertHandler}
        addButtonTestId="addOption"
        deleteHandler={removeHandler}
        deleteButtonTestId="removeOption"
        showDelete={hasMany}
      />
    </Flex>
  );
};

const MultipleChoiceFields = ({ index }) => {
  const { values } = useFormikContext();
  const options = values.questionList[index].options;

  return (
    <FieldArray name={`questionList.${index}.options`}>
      {({ insert, remove }) => {
        const insertHandler = (optionIndex) => {
          insert(optionIndex + 1, {
            id: uuid(),
            label: 'Option',
          });
        };
        const removeHandler = (optionIndex) => {
          remove(optionIndex);
        };

        return (
          <Flex data-testid="multipleChoiceFields" direction="column" w="100%">
            {options?.map((option, optionIndex) => (
              <MultipleChoiceField
                key={option?.id}
                hasMany={options?.length > 1}
                index={index}
                insertHandler={() => insertHandler(optionIndex)}
                notLast={options?.length - 1 !== optionIndex}
                optionIndex={optionIndex}
                removeHandler={() => removeHandler(optionIndex)}
              />
            ))}
          </Flex>
        );
      }}
    </FieldArray>
  );
};

MultipleChoiceFields.propTypes = {
  index: PropTypes.number.isRequired,
};

export default MultipleChoiceFields;

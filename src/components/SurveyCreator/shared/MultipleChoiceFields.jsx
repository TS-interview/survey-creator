import React from 'react';

import { Flex, Icon, Input } from '@chakra-ui/react';
import { FastField, FieldArray, useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import { ImRadioUnchecked } from 'react-icons/im';
import uuid from 'react-uuid';

import FormButtonPanel from './FormButtonPanel';

const MultipleChoiceField = ({
  index,
  hasMany,
  insertHandler,
  removeHandler,
  notLast,
  optionIndex,
}) => {
  return (
    <Flex justify="space-between" w="100%" mb={notLast ? '16px' : '0'}>
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
        deleteHandler={removeHandler}
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
        const insertHandler = () => {
          insert(index + 1, {
            id: uuid(),
            label: 'Option',
          });
        };
        const removeHandler = () => {
          remove(index);
        };

        return (
          <Flex direction="column" w="100%">
            {options?.map((option, optionIndex) => (
              <MultipleChoiceField
                key={option?.id}
                optionIndex={optionIndex}
                index={index}
                hasMany={options?.length > 1}
                insertHandler={insertHandler}
                removeHandler={removeHandler}
                notLast={options?.length - 1 !== optionIndex}
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

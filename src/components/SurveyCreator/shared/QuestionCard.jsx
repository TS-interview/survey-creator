import React from 'react';

import { Box, Flex, Select } from '@chakra-ui/react';
import { useField } from 'formik';
import { Field, FieldArray, Form, Formik } from 'formik';
import { Draggable } from 'react-beautiful-dnd';

import EditableFormikField from '../../common/EditableFormikField';
import { QUESTION_TYPES } from '../constant';

const TypeSelect = ({ name }) => {
  const [field] = useField(name);
  return (
    <Select w="200px" placeholder="Select option" {...field}>
      {Object.values(QUESTION_TYPES).map((type) => (
        <option value={type.id}>{type.label}</option>
      ))}
    </Select>
  );
};

const QuestionCard = ({ index }) => {
  return (
    <Flex bg="white" w="100%" p="16px 24px" borderRadius="xl">
      <Flex align="center" justify={'space-between'} w="100%">
        <EditableFormikField name={`questionList.${index}.title`} />
        <TypeSelect name={`questionList.${index}.type`} />
      </Flex>
      {/* Add options here */}
    </Flex>
  );
};

export default QuestionCard;

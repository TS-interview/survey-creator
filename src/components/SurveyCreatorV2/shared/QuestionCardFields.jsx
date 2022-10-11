import React from 'react';

import {
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';

import { QUESTION_TYPES } from '../constants';
import MultipleChoiceFields from './MultipleChoiceFields';

const QuestionCardFields = ({ index }) => {
  const { values } = useFormikContext();
  const type = values.children[index].type;

  let content = null;

  const PreviewText = () => (
    <Text color="gray.500" fontWeight="500" mb="8px">
      This is an example input field of the selected question type.
    </Text>
  );

  const BooleanFieldPreview = () => (
    <RadioGroup data-testid="booleanFieldPreview" isDisabled>
      <Stack direction="column">
        <Radio value="1">True</Radio>
        <Radio value="2">False</Radio>
      </Stack>
    </RadioGroup>
  );

  const NumberFieldPreview = () => (
    <NumberInput
      bg="gray.200"
      data-testid="numberFieldPreview"
      defaultValue={15}
      isDisabled
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
  if (type === QUESTION_TYPES.multipleChoice.id) {
    content = <MultipleChoiceFields index={index} />;
  } else if (type?.length === 0) {
    content = (
      <Text color="gray.500" fontWeight="500" mb="8px">
        Please select a question type.
      </Text>
    );
  } else {
    let previewField;
    switch (type) {
      case QUESTION_TYPES.boolean.id:
        previewField = <BooleanFieldPreview />;
        break;
      case QUESTION_TYPES.number.id:
        previewField = <NumberFieldPreview />;
        break;
      case QUESTION_TYPES.text.id:
        previewField = (
          <Textarea
            bg="gray.300"
            data-testid="textFieldPreview"
            isDisabled
            value="Text goes here"
          />
        );
        break;
      default:
        return;
    }

    content = (
      <Flex direction="column">
        <PreviewText />
        {previewField}
      </Flex>
    );
  }

  return (
    <Flex w="100%" m="32px 0">
      {content}
    </Flex>
  );
};

QuestionCardFields.propTypes = {
  index: PropTypes.number.isRequired,
};

export default QuestionCardFields;

import React, { useCallback, useState } from 'react';

import { DragHandleIcon } from '@chakra-ui/icons';
import { Box, Collapse, Divider, Flex, Heading, Input } from '@chakra-ui/react';
import { Draggable } from '@hello-pangea/dnd';
import { FastField } from 'formik';
import PropTypes from 'prop-types';

import { createDefaultQuestion, getQuestionTypeLabel } from '../helpers';
import FormButtonPanel from './FormButtonPanel';
import QuestionCardFields from './QuestionCardFields';
import QuestionTypeSelect from './QuestionTypeSelect';

const QuestionCard = ({
  index,
  insert,
  remove,
  activeItem,
  setActive,
  question,
}) => {
  const [isHover, setIsHover] = useState(false);
  const isActive = activeItem === question?.id;

  const onMouseEnterHandler = useCallback(() => {
    setIsHover(true);
  }, []);

  const onMouseLeaveHandler = useCallback(() => {
    setIsHover(false);
  }, []);

  const insertHandler = useCallback(() => {
    const defaultQuestion = createDefaultQuestion();
    // BUG: there seems to be an issue w/ updating parent state from FieldArray
    // setActive(defaultQuestion.id);
    insert(index + 1, defaultQuestion);
  }, [index]);

  const removeHandler = useCallback(() => {
    // setActive(null);
    remove(index);
  }, [index]);

  const setCurrentToActive = useCallback(() => {
    setActive(question?.id);
  }, []);

  return (
    <Draggable draggableId={question?.id} index={index}>
      {(provided, snapshot) => (
        <Flex
          bg="white"
          border={!isActive && '1px solid #E2E8F0'}
          borderRadius="xl"
          boxShadow={isActive && 'md'}
          data-testid="questionCard"
          direction="column"
          opacity={snapshot.isDragging ? '0.75' : '1'}
          onFocus={setCurrentToActive}
          onClick={setCurrentToActive}
          onMouseEnter={onMouseEnterHandler}
          onMouseLeave={onMouseLeaveHandler}
          p="32px 24px"
          position="relative"
          w="100%"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <DragHandleIcon
            color="gray.500"
            position="absolute"
            top="8px"
            left="49%"
            style={{
              transform: 'rotate(90deg)',
              visibility:
                isActive || snapshot.isDragging || isHover
                  ? 'visible'
                  : 'hidden',
            }}
          />
          <Box
            height="100%"
            position="absolute"
            bg="purple.400"
            borderLeftRadius="xl"
            top="0"
            left="0"
            width="6px"
            style={{
              visibility: isActive ? 'visible' : 'hidden',
            }}
          />
          <Flex align="center" justify={'space-between'} w="100%">
            {isActive ? (
              <>
                <FastField
                  as={Input}
                  bg="gray.50"
                  name={`questionList.${index}.title`}
                  w="200px"
                />
                <QuestionTypeSelect
                  name={`questionList.${index}.type`}
                  index={index}
                  previousType={question?.type}
                />
              </>
            ) : (
              <>
                <Heading as="h5" size="sm" fontWeight="500">
                  {question?.title}
                </Heading>
                <Heading as="h6" size="sm" fontWeight="400" color="gray.500">
                  Type: {getQuestionTypeLabel(question?.type)}
                </Heading>
              </>
            )}
          </Flex>
          <Collapse in={isActive}>
            <QuestionCardFields index={index} />
            <Divider mt="32px" mb="16px" borderColor="gray.300" />
            <Flex justify="flex-end">
              <FormButtonPanel
                addHandler={insertHandler}
                deleteHandler={removeHandler}
              />
            </Flex>
          </Collapse>
        </Flex>
      )}
    </Draggable>
  );
};

QuestionCard.propTypes = {
  index: PropTypes.number.isRequired,
  insert: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  activeItem: PropTypes.string,
  setActive: PropTypes.func.isRequired,
  question: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string,
      })
    ),
  }),
};

export default QuestionCard;

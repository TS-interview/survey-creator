import React, { useCallback, useState } from 'react';

import { DragHandleIcon } from '@chakra-ui/icons';
import { DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Collapse,
  Divider,
  Flex,
  Heading,
  IconButton,
  Input,
} from '@chakra-ui/react';
import { Draggable } from '@hello-pangea/dnd';
import { FastField } from 'formik';
import PropTypes from 'prop-types';

import { CHILDREN_TYPES } from '../constants';
import { createDefaultItem, getQuestionTypeLabel } from '../helpers';
import FloatingMenu from './FloatingMenu';
import QuestionCardFields from './QuestionCardFields';
import QuestionTypeSelect from './QuestionTypeSelect';

const QuestionCard = ({
  activeItem,
  index,
  insert,
  question,
  remove,
  setActive,
}) => {
  const [isHover, setIsHover] = useState(false);
  const isActive = activeItem === question?.id;

  const onMouseEnterHandler = useCallback(() => {
    setIsHover(true);
  }, []);

  const onMouseLeaveHandler = useCallback(() => {
    setIsHover(false);
  }, []);

  const insertQuestionHandler = useCallback(() => {
    const defaultQuestion = createDefaultItem(CHILDREN_TYPES.question);
    setActive(defaultQuestion?.id);
    insert(index + 1, defaultQuestion);
  }, [index]);

  const insertFolderHandler = useCallback(() => {
    const defaultQuestion = createDefaultItem(CHILDREN_TYPES.folder);
    setActive(defaultQuestion?.id);
    insert(index + 1, defaultQuestion);
  }, [index]);

  const removeHandler = useCallback(() => {
    remove(index);
  }, [index]);

  const setCurrentToActive = useCallback(() => {
    if (!isActive) {
      setActive(question?.id);
    }
  }, [isActive]);

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
          onClick={setCurrentToActive}
          onFocus={setCurrentToActive}
          onMouseEnter={onMouseEnterHandler}
          onMouseLeave={onMouseLeaveHandler}
          opacity={snapshot.isDragging ? '0.75' : '1'}
          p="32px 24px"
          position="relative"
          ref={provided.innerRef}
          w="100%"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <DragHandleIcon
            color="gray.500"
            left="49%"
            position="absolute"
            style={{
              transform: 'rotate(90deg)',
              visibility:
                isActive || snapshot.isDragging || isHover
                  ? 'visible'
                  : 'hidden',
            }}
            top="8px"
          />
          <Box
            bg="purple.400"
            borderLeftRadius="xl"
            height="100%"
            left="0"
            position="absolute"
            style={{
              visibility: isActive ? 'visible' : 'hidden',
            }}
            top="0"
            width="6px"
          />
          <Flex align="center" justify={'space-between'} w="100%">
            {isActive ? (
              <>
                <FastField
                  as={Input}
                  bg="gray.50"
                  name={`children.${index}.title`}
                  w="200px"
                />
                <QuestionTypeSelect
                  name={`children.${index}.type`}
                  index={index}
                  previousType={question?.type}
                />
              </>
            ) : (
              <>
                <Heading as="h5" size="sm" fontWeight="500">
                  {question?.title}
                </Heading>
                <Heading as="h6" color="gray.500" size="sm" fontWeight="400">
                  Type: {getQuestionTypeLabel(question?.type)}
                </Heading>
              </>
            )}
          </Flex>
          <Collapse in={isActive}>
            <QuestionCardFields index={index} />
            <Divider borderColor="gray.300" mb="16px" mt="32px" />
            <Flex justify="flex-end">
              <IconButton
                aria-label="delete question"
                colorScheme="red"
                data-testid="deleteQuestionButton"
                icon={<DeleteIcon />}
                onClick={removeHandler}
              />
            </Flex>
          </Collapse>
          <FloatingMenu
            addFolderHandler={insertFolderHandler}
            addQuestionHandler={insertQuestionHandler}
            isOpen={isActive}
          />
        </Flex>
      )}
    </Draggable>
  );
};

QuestionCard.propTypes = {
  activeItem: PropTypes.string,
  index: PropTypes.number.isRequired,
  insert: PropTypes.func.isRequired,
  question: PropTypes.shape({
    id: PropTypes.string.isRequired,
    itemType: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string,
      })
    ),
  }),
  remove: PropTypes.func.isRequired,
  setActive: PropTypes.func.isRequired,
};

const arePropsEqual = (prevProps, nextProps) => {
  return (
    prevProps.activeItem === nextProps.activeItem &&
    prevProps.index === nextProps.index
  );
};

export default React.memo(QuestionCard, arePropsEqual);

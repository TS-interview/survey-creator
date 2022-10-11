import React, { useCallback, useState } from 'react';

import { DragHandleIcon } from '@chakra-ui/icons';
import { DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  ButtonGroup,
  Collapse,
  Divider,
  Flex,
  Heading,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react';
import { Draggable } from '@hello-pangea/dnd';
import { FastField } from 'formik';
import PropTypes from 'prop-types';
import { BiFolderOpen } from 'react-icons/bi';

import { CHILDREN_TYPES } from '../constants';
import { createDefaultItem } from '../helpers';
import FloatingMenu from './FloatingMenu';

const FolderCard = ({
  activeItem,
  index,
  folder,
  insert,
  remove,
  setActive,
  prevNotFolder,
}) => {
  const [isHover, setIsHover] = useState(false);
  const isActive = activeItem === folder?.id;

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
    // add modal
    remove(index);
  }, [index]);

  const setCurrentToActive = useCallback(() => {
    if (!isActive) {
      setActive(folder?.id);
    }
  }, [isActive]);

  return (
    <Draggable draggableId={folder?.id} index={index}>
      {(provided, snapshot) => (
        <Flex
          bg="white"
          border={!isActive && '1px solid #E2E8F0'}
          borderTopRightRadius="xl"
          borderBottomRadius="xl"
          boxShadow={isActive && 'md'}
          data-testid="folderCard"
          direction="column"
          onClick={setCurrentToActive}
          onFocus={setCurrentToActive}
          onMouseEnter={onMouseEnterHandler}
          onMouseLeave={onMouseLeaveHandler}
          opacity={snapshot.isDragging ? '0.75' : '1'}
          p="32px 24px"
          position="relative"
          mb={'32px !important'}
          mt={prevNotFolder ? '62px !important' : '32px !important'}
          ref={provided.innerRef}
          w="100%"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Box
            bg="purple.400"
            borderTopRadius="xl"
            h="30px"
            left="0"
            position="absolute"
            top="-30px"
            w="90px"
          />
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
            borderBottomLeftRadius="xl"
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
              <FastField
                as={Input}
                bg="gray.50"
                name={`children.${index}.title`}
                w="200px"
              />
            ) : (
              <Heading as="h5" size="sm" fontWeight="500">
                {folder?.title}
              </Heading>
            )}
            <Heading as="h6" color="gray.500" size="sm" fontWeight="400">
              contains {folder?.totalFolders} folders, {folder?.totalQuestions}{' '}
              questions
            </Heading>
          </Flex>
          <Collapse in={isActive}>
            <Text p="24px 16px 0">{folder?.description}</Text>
            <Divider borderColor="gray.300" mb="16px" mt="32px" />
            <Flex justify="flex-end">
              <ButtonGroup>
                <IconButton
                  aria-label="delete folder"
                  colorScheme="red"
                  data-testid="deleteFolderButton"
                  icon={<DeleteIcon />}
                  onClick={removeHandler}
                />
                <IconButton
                  aria-label="go to folder view"
                  colorScheme="blue"
                  data-testid="openFolderButton"
                  icon={<BiFolderOpen />}
                  onClick={() => {}}
                />
              </ButtonGroup>
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

FolderCard.propTypes = {
  activeItem: PropTypes.string,
  index: PropTypes.number.isRequired,
  insert: PropTypes.func.isRequired,
  folder: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    itemType: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string,
      })
    ),
  }),
  remove: PropTypes.func.isRequired,
  setActive: PropTypes.func.isRequired,
  prevNotFolder: PropTypes.bool,
};

const arePropsEqual = (prevProps, nextProps) => {
  return (
    prevProps.activeItem === nextProps.activeItem &&
    prevProps.index === nextProps.index
  );
};

export default React.memo(FolderCard, arePropsEqual);

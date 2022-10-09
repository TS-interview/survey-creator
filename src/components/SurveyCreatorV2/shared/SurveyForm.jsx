import React, { useState } from 'react';

import { Box, Button, Flex, VStack } from '@chakra-ui/react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { FieldArray, Form, Formik } from 'formik';

import { ITEM_TYPES } from '../constants';
import { createDefaultItem } from '../helpers';
import FolderCard from './FolderCard';
import QuestionCard from './QuestionCard';
import TitleCard from './TitleCard';

const SurveyForm = ({ survey }) => {
  const [activeItem, setActiveItem] = useState(null);

  const submitHandler = async (values) => {
    await new Promise((r) => setTimeout(r, 500));
    const payload = JSON.stringify(values, null, 2);
    localStorage.setItem('survey', payload);
    alert(payload);
  };

  return (
    <Flex justify="center" mb="100px" w="100%">
      <Formik
        initialValues={{
          title: survey?.title || '',
          description: survey?.description || '',
          items: survey?.items || [],
        }}
        onSubmit={submitHandler}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ values }) => (
          <Form>
            <VStack w="780px">
              <TitleCard
                title={values.title}
                description={values.description}
              />

              <FieldArray name="items">
                {({ insert, remove, push, swap, pop }) => {
                  const dragEndHandler = (result) => {
                    // dropped outside the list
                    if (!result.destination) {
                      return;
                    }
                    swap(result.source.index, result.destination.index);
                    setActiveItem(result?.draggableId);
                  };

                  const addNewItem = (type) => {
                    const defaultItem = createDefaultItem(type);
                    setActiveItem(defaultItem.id);
                    push(defaultItem);
                  };

                  const addNewQuestion = () => addNewItem(ITEM_TYPES.question);
                  const addNewFolder = () => addNewItem(ITEM_TYPES.folder);

                  const popItem = () => {
                    setActiveItem(null);
                    pop();
                  };

                  return (
                    <Flex align="center" direction="column">
                      <DragDropContext onDragEnd={dragEndHandler}>
                        <Droppable droppableId="droppable">
                          {(provided) => (
                            <VStack
                              w="780px"
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                            >
                              {values.items?.map((item, index) => {
                                const prevNotFolder =
                                  index > 0 &&
                                  values.items[index - 1]?.itemType !==
                                    ITEM_TYPES.folder;
                                const nextNotFolder =
                                  index < values.items?.length - 2 &&
                                  values.items[index + 1]?.itemType !==
                                    ITEM_TYPES.folder;

                                return item?.itemType ===
                                  ITEM_TYPES.question ? (
                                  <QuestionCard
                                    key={item?.id}
                                    activeItem={activeItem}
                                    index={index}
                                    insert={insert}
                                    question={item}
                                    remove={remove}
                                    setActive={setActiveItem}
                                  />
                                ) : (
                                  <FolderCard
                                    key={item?.id}
                                    activeItem={activeItem}
                                    index={index}
                                    insert={insert}
                                    folder={item}
                                    remove={remove}
                                    setActive={setActiveItem}
                                    prevNotFolder={prevNotFolder}
                                    nextNotFolder={nextNotFolder}
                                  />
                                );
                              })}
                              {provided.placeholder}
                            </VStack>
                          )}
                        </Droppable>
                      </DragDropContext>
                    </Flex>
                  );
                }}
              </FieldArray>
            </VStack>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export default SurveyForm;

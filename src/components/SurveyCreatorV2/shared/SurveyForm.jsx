import React, { useState } from 'react';

import { Box, Flex, SimpleGrid, VStack } from '@chakra-ui/react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { FieldArray, Form, Formik } from 'formik';

import { CHILDREN_TYPES } from '../constants';
import FolderCard from './FolderCard';
import QuestionCard from './QuestionCard';
import SurveyNavigation from './SurveyNavigation';
import TitleCard from './TitleCard';

const SurveyForm = ({ survey }) => {
  const [activeItem, setActiveItem] = useState(null);

  const submitHandler = async (values) => {
    // await new Promise((r) => setTimeout(r, 500));
    const payload = JSON.stringify(values, null, 2);
    localStorage.setItem('survey', payload);
    // alert(payload);
  };

  return (
    <Flex mb="100px" w="100%">
      <Formik
        initialValues={{
          title: survey?.title || '',
          description: survey?.description || '',
          children: survey?.children || [],
        }}
        onSubmit={submitHandler}
        validateOnChange={false}
        validateOnBlur={false}
        enableReinitialize
      >
        {({ values, setFieldValue, submitForm, resetForm }) => (
          <Form>
            <SimpleGrid columns={3} w="100%">
              <SurveyNavigation />
              <VStack w="600px">
                <TitleCard
                  title={values.title}
                  description={values.description}
                />

                <FieldArray name="children">
                  {({ insert, remove, push, swap, pop }) => {
                    const dragEndHandler = (result) => {
                      // dropped outside the list and not combined
                      if (!result.destination && !result.combine) {
                        return;
                      }

                      if (result.destination) {
                        swap(result.source.index, result.destination.index);
                        setActiveItem(result?.draggableId);
                      } else if (result.combine) {
                        const combineItem =
                          values.children[result.source.index];
                        const destinationItemIndex = values.children?.findIndex(
                          (item) => item.id === result.combine.draggableId
                        );
                        const destinationItem =
                          values.children[destinationItemIndex];

                        if (
                          destinationItem.itemType === CHILDREN_TYPES.folder
                        ) {
                          let questionCount = destinationItem.totalQuestions;
                          let folderCount = destinationItem.totalFolders;

                          if (
                            combineItem.itemType === CHILDREN_TYPES.question
                          ) {
                            questionCount++;
                          } else if (
                            combineItem.itemType === CHILDREN_TYPES.folder
                          ) {
                            questionCount += combineItem.totalQuestions;
                            folderCount += combineItem.totalFolders + 1;
                          }

                          setFieldValue(`children.${destinationItemIndex}`, {
                            ...destinationItem,
                            totalQuestions: questionCount,
                            totalFolders: folderCount,
                            children: [
                              ...destinationItem?.children,
                              { ...combineItem },
                            ],
                          });
                          remove(result.source.index);
                        }
                        submitForm();
                      }
                    };

                    return (
                      <Flex align="center" direction="column">
                        <DragDropContext onDragEnd={dragEndHandler}>
                          <Droppable droppableId="droppable" isCombineEnabled>
                            {(provided) => (
                              <VStack
                                w="600px"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                              >
                                {values.children?.map((item, index) => {
                                  const prevNotFolder =
                                    index > 0 &&
                                    values.children[index - 1]?.itemType !==
                                      CHILDREN_TYPES.folder;

                                  return item?.itemType ===
                                    CHILDREN_TYPES.question ? (
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
              <Box />
            </SimpleGrid>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export default SurveyForm;

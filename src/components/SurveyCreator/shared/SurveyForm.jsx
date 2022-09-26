import React, { useState } from 'react';

import { Box, Button, Flex, VStack } from '@chakra-ui/react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { FieldArray, Form, Formik } from 'formik';

import { createDefaultQuestion } from '../helpers';
import FormButtonPanel from './FormButtonPanel';
import QuestionCard from './QuestionCard';
import TitleCard from './TitleCard';

const SurveyForm = ({ survey }) => {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <Flex justify="center" mb="100px" w="100%">
      <Formik
        initialValues={{
          title: survey?.title || '',
          description: survey?.description || '',
          questionList: survey?.questionList || [],
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
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

              <FieldArray name="questionList">
                {({ insert, remove, push, swap, pop }) => {
                  const dragEndHandler = (result) => {
                    // dropped outside the list
                    if (!result.destination) {
                      return;
                    }
                    swap(result.source.index, result.destination.index);
                    setActiveItem(result?.draggableId);
                  };

                  const addNewQuestion = () => {
                    const defaultQuestion = createDefaultQuestion();
                    setActiveItem(defaultQuestion.id);
                    push(defaultQuestion);
                  };

                  const popQuestion = () => {
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
                              {values.questionList?.map((question, index) => (
                                <QuestionCard
                                  key={question?.id}
                                  activeItem={activeItem}
                                  index={index}
                                  insert={insert}
                                  question={question}
                                  remove={remove}
                                  setActive={setActiveItem}
                                />
                              ))}
                              {provided.placeholder}
                            </VStack>
                          )}
                        </Droppable>
                      </DragDropContext>
                      <Box mt="32px">
                        <FormButtonPanel
                          addHandler={addNewQuestion}
                          addButtonTestId="pushQuestionButton"
                          deleteHandler={popQuestion}
                          deleteButtonTestId="popQuestionButton"
                          showDelete={values.questionList?.length > 0}
                        />
                      </Box>
                    </Flex>
                  );
                }}
              </FieldArray>
              <Button colorScheme="green" type="submit">
                Preview
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export default SurveyForm;

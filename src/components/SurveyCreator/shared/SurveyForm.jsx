import React, { useState } from 'react';

import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, IconButton, VStack } from '@chakra-ui/react';
import { Field, FieldArray, Form, Formik } from 'formik';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import QuestionCard from './QuestionCard';
import TitleCard from './TitleCard';

const SurveyForm = ({ survey }) => {
  console.log(survey);
  return (
    <Flex justify="center" w="100%">
      <Formik
        initialValues={{
          title: survey.title,
          description: survey.description,
          questionList: survey.questionList,
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ values }) => (
          <Form>
            <VStack w="780px">
              <TitleCard
                title={values.title}
                description={values.description}
              />

              <FieldArray name="questionList">
                {({ insert, remove, push, swap, move, pop }) => (
                  <Flex align="center" direction="column">
                    {/* <DragDropContext>
                    <Droppable> */}
                    <VStack w="780px">
                      {values.questionList?.map((question, index) => (
                        <QuestionCard
                          key={index}
                          index={index}
                          insert={insert}
                          remove={remove}
                        />
                      ))}
                    </VStack>

                    {/* </Droppable>
                    </DragDropContext> */}
                    <Box mt="32px">
                      <IconButton
                        aria-label="add question"
                        colorScheme="teal"
                        icon={<AddIcon />}
                        mr="8px"
                        onClick={() =>
                          push({
                            title: 'Question',
                            type: 'multiple-choice',
                            options: ['Option 1'],
                          })
                        }
                      />
                      {values.questionList?.length > 0 && (
                        <IconButton
                          aria-label="delete question"
                          colorScheme="red"
                          icon={<DeleteIcon />}
                          onClick={() => pop()}
                        />
                      )}
                    </Box>
                  </Flex>
                )}
              </FieldArray>
              <Button colorScheme="green" type="submit">
                Submit
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export default SurveyForm;

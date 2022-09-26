import React from 'react';

import { VStack } from '@chakra-ui/react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form, Formik } from 'formik';

import { QUESTION_TYPES } from '../constants';
import QuestionCard from './QuestionCard';

const mockData = {
  index: 0,
  insert: jest.fn(),
  remove: jest.fn(),
  activeItem: '123',
  setActive: jest.fn(),
  question: {
    id: '123',
    title: 'Question 123',
    type: QUESTION_TYPES.multipleChoice.id,
    options: [
      {
        id: 'option-123',
        label: 'Option 123',
      },
    ],
  },
};

const mockInit = {
  title: 'blah',
  description: 'super blah',
  questionList: [mockData.question],
};

const renderComp = () =>
  render(
    <Formik initialValues={mockInit}>
      <Form>
        <DragDropContext onDragEnd={() => {}}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <VStack {...provided.droppableProps} ref={provided.innerRef}>
                <QuestionCard {...mockData} />
              </VStack>
            )}
          </Droppable>
        </DragDropContext>
      </Form>
    </Formik>
  );

describe('QuestionCard', () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('can create number type', async () => {
    const { container, getByTestId, findByTestId } = renderComp();
    expect(getByTestId('questionCard')).toBeInTheDocument();

    expect(
      container.querySelector(`input[name="questionList.0.options.0.label"]`)
    ).toBeInTheDocument();

    expect(getByTestId('questionTypeSelect')).toBeInTheDocument();
    const typeDropdown = getByTestId('questionTypeSelect');
    user.selectOptions(typeDropdown, ['number']);

    expect(await findByTestId('numberFieldPreview')).toBeInTheDocument();
    expect(
      container.querySelector(`input[name="questionList.0.options.0.label"]`)
    ).not.toBeInTheDocument();
  });

  it('can create text type', async () => {
    const { container, getByTestId, findByTestId } = renderComp();
    expect(getByTestId('questionCard')).toBeInTheDocument();

    expect(
      container.querySelector(`input[name="questionList.0.options.0.label"]`)
    ).toBeInTheDocument();

    expect(getByTestId('questionTypeSelect')).toBeInTheDocument();
    const typeDropdown = getByTestId('questionTypeSelect');
    user.selectOptions(typeDropdown, ['text']);

    expect(await findByTestId('textFieldPreview')).toBeInTheDocument();
    expect(
      container.querySelector(`input[name="questionList.0.options.0.label"]`)
    ).not.toBeInTheDocument();
  });

  it('can create boolean type', async () => {
    const { container, getByTestId, findByTestId } = renderComp();
    expect(getByTestId('questionCard')).toBeInTheDocument();

    expect(
      container.querySelector(`input[name="questionList.0.options.0.label"]`)
    ).toBeInTheDocument();

    expect(getByTestId('questionTypeSelect')).toBeInTheDocument();
    const typeDropdown = getByTestId('questionTypeSelect');
    user.selectOptions(typeDropdown, ['boolean']);

    expect(await findByTestId('booleanFieldPreview')).toBeInTheDocument();
    expect(
      container.querySelector(`input[name="questionList.0.options.0.label"]`)
    ).not.toBeInTheDocument();
  });

  it('can create multiple choice type', async () => {
    const { container, getByTestId, findByTestId } = renderComp();
    expect(getByTestId('questionCard')).toBeInTheDocument();

    expect(getByTestId('questionTypeSelect')).toBeInTheDocument();
    const typeDropdown = getByTestId('questionTypeSelect');
    user.selectOptions(typeDropdown, ['boolean']);

    expect(await findByTestId('booleanFieldPreview')).toBeInTheDocument();
    expect(
      container.querySelector(`input[name="questionList.0.options.0.label"]`)
    ).not.toBeInTheDocument();

    user.selectOptions(typeDropdown, ['multiple-choice']);

    expect(await findByTestId('multipleChoiceFields')).toBeInTheDocument();
    expect(
      container.querySelector(`input[name="questionList.0.options.0.label"]`)
    ).toBeInTheDocument();
  });
});

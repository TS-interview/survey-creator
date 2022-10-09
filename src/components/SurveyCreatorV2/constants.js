import uuid from 'react-uuid';

export const QUESTION_TYPES = {
  boolean: { id: 'boolean', label: 'Boolean' },
  multipleChoice: { id: 'multiple-choice', label: 'Multiple choice' },
  number: { id: 'number', label: 'Number' },
  text: { id: 'text', label: 'Text' },
};

export const ITEM_TYPES = {
  question: 'question',
  folder: 'folder',
};

// dummy data, would usually put this in a /mocks folder
export const dummySurveyData = {
  title: 'Untitled survey',
  description: 'description',
  items: [
    {
      id: uuid(),
      itemType: ITEM_TYPES.question,
      title: 'Question 1',
      type: 'multiple-choice',
      options: [{ id: uuid(), label: 'option 1' }],
    },
  ],
};
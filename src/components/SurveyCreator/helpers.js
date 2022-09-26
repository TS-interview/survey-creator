import uuid from 'react-uuid';

import { QUESTION_TYPES } from './constants';

// will separate out to a helper function
export const getQuestionTypeLabel = (id) => {
  for (const type of Object.values(QUESTION_TYPES)) {
    if (type.id === id) {
      return type.label;
    }
  }
  return 'Question type not found';
};

export const createDefaultQuestion = () => {
  return {
    id: uuid(),
    title: 'Question',
    type: 'multiple-choice',
    options: [{ id: uuid(), label: 'Option 1' }],
  };
};

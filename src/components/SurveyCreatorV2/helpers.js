import uuid from 'react-uuid';

import { CHILDREN_TYPES, QUESTION_TYPES } from './constants';

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
    itemType: CHILDREN_TYPES.question,
    title: 'Question',
    type: 'multiple-choice',
    options: [{ id: uuid(), label: 'Option 1' }],
  };
};
const createDefaultFolder = () => {
  return {
    id: uuid(),
    itemType: CHILDREN_TYPES.folder,
    title: 'Folder',
    description: 'folder description...',
    totalQuestions: 0,
    totalFolders: 0,
    children: [],
  };
};

export const createDefaultItem = (type) => {
  switch (type) {
    case CHILDREN_TYPES.question:
    default:
      return createDefaultQuestion();
    case CHILDREN_TYPES.folder:
      return createDefaultFolder();
  }
};

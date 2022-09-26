import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SurveyCreator from './SurveyCreator';

// TODO: test drag and drop in Cypress/etc.
describe('SurveyCreator', () => {
  it('can add new question', async () => {
    const user = userEvent.setup();
    render(<SurveyCreator />);

    expect(screen.queryByTestId('questionCard')).not.toBeInTheDocument();

    expect(screen.getByTestId('pushQuestionButton')).toBeInTheDocument();
    const addButton = screen.getByTestId('pushQuestionButton');
    await user.click(addButton);

    expect(await screen.findByTestId('questionCard')).toBeInTheDocument();
  });

  it('can remove question', async () => {
    const user = userEvent.setup();
    render(<SurveyCreator />);
    const addButton = screen.getByTestId('pushQuestionButton');
    await user.click(addButton);

    expect(screen.getByTestId('questionCard')).toBeInTheDocument();

    expect(screen.getByTestId('popQuestionButton')).toBeInTheDocument();
    const removeButton = screen.getByTestId('popQuestionButton');
    await user.click(removeButton);

    expect(screen.queryByTestId('questionCard')).not.toBeInTheDocument();
  });
});

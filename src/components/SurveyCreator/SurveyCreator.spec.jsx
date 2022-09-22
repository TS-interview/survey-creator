import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SurveyCreator from './SurveyCreator';

describe('SurveyCreator', () => {
  it('can add new question', async () => {
    const user = userEvent.setup();
    render(<SurveyCreator />);

    expect(screen.getByTestId('question-1')).not.toBeInTheDocument();

    const addButton = screen.getByTestId('add-new-button');
    await user.click(addButton);

    expect(screen.getByTestId('question-1')).toBeInTheDocument();
  });

  it('can remove question', async () => {
    const user = userEvent.setup();
    render(<SurveyCreator />);
    const addButton = screen.getByTestId('add-new-button');
    await user.click(addButton);

    expect(screen.getByTestId('question-1')).toBeInTheDocument();

    const removeQ1Button = screen.getByTestId('remove-new-button');
    await user.click(removeQ1Button);

    expect(screen.getByTestId('question-1')).not.toBeInTheDocument();
  });

  it('can re-order questions', async () => {
    const user = userEvent.setup();
    render(<SurveyCreator />);

    // create 3 buttons
    const addButton = screen.getByTestId('add-new-button');
    await user.click(addButton);
    await user.click(addButton);
    await user.click(addButton);

    // re-order

    // submit and check payload
  });

  describe('can create different question types', () => {
    it('can create number type', async () => {
      const user = userEvent.setup();
      render(<SurveyCreator />);

      const addButton = screen.getByTestId('add-new-button');
      await user.click(addButton);

      expect(screen.getByTestId('question-1')).toBeInTheDocument();
      const typeDropdown = screen.getByTestId('type-dropdown-1');
      await user.click(screen.getByTestId('number-type'));

      // some type of expect
    });

    it('can create text type', async () => {
      const user = userEvent.setup();
      render(<SurveyCreator />);

      const addButton = screen.getByTestId('add-new-button');
      await user.click(addButton);

      expect(screen.getByTestId('question-1')).toBeInTheDocument();
      const typeDropdown = screen.getByTestId('type-dropdown-1');
      await user.click(screen.getByTestId('text-type'));

      // some type of expect
    });

    it('can create boolean type', async () => {
      const user = userEvent.setup();
      render(<SurveyCreator />);

      const addButton = screen.getByTestId('add-new-button');
      await user.click(addButton);

      expect(screen.getByTestId('question-1')).toBeInTheDocument();
      const typeDropdown = screen.getByTestId('type-dropdown-1');
      await user.click(screen.getByTestId('boolean-type'));

      // some type of expect
    });

    it('can create multiple choice type', async () => {
      const user = userEvent.setup();
      render(<SurveyCreator />);

      const addButton = screen.getByTestId('add-new-button');
      await user.click(addButton);

      expect(screen.getByTestId('question-1')).toBeInTheDocument();
      const typeDropdown = screen.getByTestId('type-dropdown-1');
      await user.click(screen.getByTestId('multiple-choice-type'));

      // some type of expect
      expect(screen.getByTestId('option-1')).toBeInTheDocument();
      const addOptionButton = screen.getByTestId('add-option-button');
      expect(screen.getByTestId('option-2')).toBeInTheDocument();
    });
  });
});

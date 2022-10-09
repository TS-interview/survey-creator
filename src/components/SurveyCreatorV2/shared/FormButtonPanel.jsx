import React from 'react';

import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { ButtonGroup, IconButton } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const FormButtonPanel = ({
  addHandler,
  addButtonTestId,
  deleteHandler,
  deleteButtonTestId,
  showDelete,
}) => (
  <ButtonGroup>
    <IconButton
      aria-label="add question"
      colorScheme="teal"
      data-testid={addButtonTestId}
      icon={<AddIcon />}
      onClick={addHandler}
    />
    {showDelete && (
      <IconButton
        aria-label="delete question"
        colorScheme="red"
        data-testid={deleteButtonTestId}
        icon={<DeleteIcon />}
        onClick={deleteHandler}
      />
    )}
  </ButtonGroup>
);

FormButtonPanel.defaultProps = {
  addButtonTestId: 'addButton',
  deleteButtonTestId: 'deleteButton',
  showDelete: true,
};

FormButtonPanel.propTypes = {
  addHandler: PropTypes.func.isRequired,
  addButtonTestId: PropTypes.string,
  deleteHandler: PropTypes.func.isRequired,
  deleteButtonTestId: PropTypes.string,
  showDelete: PropTypes.bool,
};

export default FormButtonPanel;

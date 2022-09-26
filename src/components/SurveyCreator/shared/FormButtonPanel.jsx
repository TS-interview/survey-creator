import React from 'react';

import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { Button, ButtonGroup, IconButton } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const FormButtonPanel = ({ addHandler, deleteHandler, showDelete }) => (
  <ButtonGroup>
    <IconButton
      aria-label="add question"
      colorScheme="teal"
      icon={<AddIcon />}
      onClick={addHandler}
    />
    {showDelete && (
      <IconButton
        aria-label="delete question"
        colorScheme="red"
        icon={<DeleteIcon />}
        onClick={deleteHandler}
      />
    )}
  </ButtonGroup>
);

FormButtonPanel.defaultProps = {
  showDelete: true,
};

FormButtonPanel.propTypes = {
  addHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  showDelete: PropTypes.bool,
};

export default FormButtonPanel;

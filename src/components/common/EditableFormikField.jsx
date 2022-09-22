import React from 'react';

import {
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
} from '@chakra-ui/react';
import { useField } from 'formik';
import PropTypes from 'prop-types';

const EditableFormikField = ({ name, type, ...props }) => {
  const [field] = useField(name);
  console.log(props);
  let InputComponent;
  switch (type) {
    case 'input':
    default:
      InputComponent = <EditableInput {...field} />;
      break;
    case 'text':
      InputComponent = <EditableTextarea {...field} />;
  }

  return (
    <Editable defaultValue={field.value} {...props}>
      <EditablePreview />
      {type === 'text' ? (
        <EditableTextarea {...field} />
      ) : (
        <EditableInput {...field} />
      )}
    </Editable>
  );
};

EditableFormikField.defaultProps = {
  type: 'input',
};

EditableFormikField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default EditableFormikField;

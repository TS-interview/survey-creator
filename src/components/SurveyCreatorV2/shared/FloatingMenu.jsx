import React from 'react';

import { IconButton, SlideFade, VStack } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import { BiFolderPlus, BiPlusCircle, BiSave, BiTransfer } from 'react-icons/bi';

const FloatingMenu = ({
  isOpen,
  addQuestionHandler,
  addFolderHandler,
  transferHandler,
}) => {
  const { submitForm } = useFormikContext();
  return (
    <SlideFade
      in={isOpen}
      offsetX="20px"
      offsetY="0px"
      unmountOnExit={true}
      style={{
        zIndex: 10,
        position: 'absolute',
        right: '-100px',
        width: 'fit-content',
      }}
    >
      <VStack bg="white" p="20px 20px" borderRadius="xl" boxShadow="md">
        <IconButton onClick={addQuestionHandler} icon={<BiPlusCircle />} />
        <IconButton onClick={addFolderHandler} icon={<BiFolderPlus />} />
        <IconButton onClick={transferHandler} icon={<BiTransfer />} />
        <IconButton onClick={submitForm} icon={<BiSave />} />
      </VStack>
    </SlideFade>
  );
};

FloatingMenu.defaultProps = {
  transferHandler: () => {},
};

FloatingMenu.propTypes = {
  addFunctionHandler: PropTypes.func.isRequired,
  addQuestionHandler: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  transferHandler: PropTypes.func,
};

export default FloatingMenu;

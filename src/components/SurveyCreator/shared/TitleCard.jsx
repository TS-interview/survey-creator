import React, { useState } from 'react';

import { Box, Flex } from '@chakra-ui/react';

import EditableFormikField from '../../common/EditableFormikField';

const TitleCard = () => {
  const [focus, setFocus] = useState(false);
  // use inside click hook here
  return (
    <Flex
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      bg="white"
      direction="column"
      w="100%"
      p="16px 24px"
      position="relative"
      borderRadius="xl"
    >
      <Box
        bg="purple.600"
        borderTopRadius="xl"
        h="16px"
        position="absolute"
        top="0"
        left="0"
        w="100%"
      />
      <EditableFormikField
        borderBottom={focus ? '1px solid black' : 'none'}
        fontWeight="500"
        fontSize="28px"
        name="title"
        mb="8px"
        mt="8px"
      />
      <EditableFormikField
        borderBottom={focus ? '1px solid black' : 'none'}
        type="text"
        name="description"
      />
    </Flex>
  );
};

export default TitleCard;

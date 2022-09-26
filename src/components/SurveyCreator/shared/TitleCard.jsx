import React, { useRef, useState } from 'react';

import { Box, Flex, Heading, Input, Text } from '@chakra-ui/react';
import { FastField, useFormikContext } from 'formik';

import useOnClickOutside from '../../../hooks/useOnClickOutside';

const TitleCard = () => {
  const { values } = useFormikContext();
  const [focus, setFocus] = useState(false);
  const cardRef = useRef(null);
  useOnClickOutside(cardRef, () => setFocus(false));

  return (
    <Flex
      ref={cardRef}
      onClick={() => setFocus(true)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      bg="white"
      border="1px solid #E2E8F0"
      borderRadius="xl"
      direction="column"
      w="100%"
      p="32px 24px"
      position="relative"
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
      {focus ? (
        <>
          <FastField
            as={Input}
            bg="gray.50"
            name="title"
            fontWeight="500"
            fontSize="28px"
            mb="8px"
            mt="8px"
            w="100%"
          />
          <FastField as={Input} bg="gray.50" name="description" w="100%" />
        </>
      ) : (
        <>
          <Heading as="h3" fontSize="28px" fontWeight="500" mb="8px" mt="8px">
            {values?.title}
          </Heading>
          <Text color="gray.500">{values?.description}</Text>
        </>
      )}
    </Flex>
  );
};

export default TitleCard;

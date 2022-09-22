import React from 'react';

import { Flex } from '@chakra-ui/react';

const Layout = ({ children }) => (
  <Flex direction="column" w="100vw" h="100vh" bg="gray.100">
    {children}
  </Flex>
);

export default Layout;

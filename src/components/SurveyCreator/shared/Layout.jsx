import React from 'react';

import { Flex } from '@chakra-ui/react';

const Layout = ({ children }) => (
  <Flex bg="gray.100" direction="column" minH="100vh" w="100%">
    {children}
  </Flex>
);

export default Layout;

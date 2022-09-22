import React from 'react';

import { Box, Heading } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const Header = ({ title }) => (
  <Box w="100%" p="16px 24px" bg="white" mb="48px">
    <Heading as="h4" size="md" fontWeight="400">
      {title}
    </Heading>
  </Box>
);

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;

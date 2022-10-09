import React from 'react';

import { Box, Heading } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const Header = ({ title }) => (
  <Box bg="white" mb="48px" p="16px 24px" w="100%">
    <Heading as="h4" size="md" fontWeight="400">
      {title}
    </Heading>
  </Box>
);

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;

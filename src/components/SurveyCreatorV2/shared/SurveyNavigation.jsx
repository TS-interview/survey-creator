import React, { useState } from 'react';

import { Flex, IconButton, VStack } from '@chakra-ui/react';
import { BiSearch } from 'react-icons/bi';
import { RiFoldersLine } from 'react-icons/ri';

import SurveyExplorer from './SurveyExplorer';
import SurveySearch from './SurveySearch';

const EXPLORER_VIEW = 'explorer';
const SEARCH_VIEW = 'search';

const SurveyNavigation = () => {
  const [navView, setNavView] = useState(EXPLORER_VIEW);
  let View = null;

  switch (navView) {
    case SEARCH_VIEW:
      View = SurveySearch;
      break;
    case EXPLORER_VIEW:
    default:
      View = SurveyExplorer;
  }

  return (
    <Flex h="calc(100% + 148px)" minH="calc(100vh - 156px)" mt="-48px">
      <VStack bg="gray.300" w="48px" pt="16px">
        <IconButton
          bg="transparent"
          onClick={() => setNavView(EXPLORER_VIEW)}
          icon={<RiFoldersLine />}
        />
        <IconButton
          bg="transparent"
          onClick={() => setNavView(SEARCH_VIEW)}
          icon={<BiSearch />}
        />
      </VStack>
      <Flex
        bg="white"
        direction="column"
        p="24px 32px"
        w="300px"
        overflow="auto"
      >
        <View />
      </Flex>
    </Flex>
  );
};

export default SurveyNavigation;

import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import SurveyCreator from './components/SurveyCreator/SurveyCreator';

function App() {
  return (
    <ChakraProvider>
      <SurveyCreator />
    </ChakraProvider>
  );
}

export default App;

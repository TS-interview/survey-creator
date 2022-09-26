import { ChakraProvider } from '@chakra-ui/react';

import SurveyCreator from './components/SurveyCreator/SurveyCreator';
import { dummySurveyData } from './components/SurveyCreator/constants';

function App() {
  return (
    <ChakraProvider>
      <SurveyCreator survey={dummySurveyData} />
    </ChakraProvider>
  );
}

export default App;

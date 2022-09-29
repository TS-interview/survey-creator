import { ChakraProvider } from '@chakra-ui/react';

import SurveyCreator from './components/SurveyCreator/SurveyCreator';
import { dummySurveyData } from './components/SurveyCreator/constants';

function App() {
  const localData = localStorage.getItem('survey');
  const data = localData ? JSON.parse(localData) : dummySurveyData;
  return (
    <ChakraProvider>
      <SurveyCreator survey={data} />
    </ChakraProvider>
  );
}

export default App;

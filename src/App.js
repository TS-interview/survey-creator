import { ChakraProvider } from '@chakra-ui/react';

import { dummySurveyData } from './components/SurveyCreator/constants';
// import SurveyCreator from './components/SurveyCreator/SurveyCreator';
import SurveyCreator from './components/SurveyCreatorV2/SurveyCreator';

function App() {
  const localData = localStorage.getItem('survey');
  const data = localData ? JSON.parse(localData) : dummySurveyData;
  return (
    <ChakraProvider>
      {/* <SurveyCreator survey={data} /> */}
      <SurveyCreator survey={data} />
    </ChakraProvider>
  );
}

export default App;

import { ChakraProvider } from '@chakra-ui/react';

// import SurveyCreator from './components/SurveyCreator/SurveyCreator';
import SurveyCreator from './components/SurveyCreatorV2/SurveyCreator';
import { dummySurveyData } from './components/SurveyCreatorV2/constants';

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

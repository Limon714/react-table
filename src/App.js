import {ChakraProvider} from '@chakra-ui/react'
import ReactTable from './ReactTable/ReactTable';

function App() {
  return (
    <>
      <div>
        <ChakraProvider>
          <ReactTable />
        </ChakraProvider>
      </div>
    </>
  );
}

export default App;

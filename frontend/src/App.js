


import { ApolloClient } from '@apollo/client';
import { InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';


import Movies from './components/Movies';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql/', // your GraphQL Server 
  cache: new InMemoryCache()
});



function App() {




  return (
   <ApolloProvider client={client}>
     <div className="App">
      <Movies />
    </div>
   </ApolloProvider>
  );
}

export default App;

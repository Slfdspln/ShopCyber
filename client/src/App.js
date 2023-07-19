import React from 'react';
import { ReactDOM } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from "./pages/Login.js";
import Home from "./pages/Home.js";
import SignUp from "./pages/createAccount.js";
import Nav from "./components/Nav";
import { StoreProvider } from './utils/GlobalState';
import { Divider } from '@material-ui/core';

function App() {
  const httpLink = createHttpLink({
    uri: '/graphql',
  });
  
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('id_token');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });
  
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
  return (  
  
  <ApolloProvider client={client}>

  <Router>
  <div>
          <StoreProvider>
            <Nav />
        <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/SignUp" element={<SignUp />} />
         <Route path="/Login" element={<Login />} />
         <Route path="/Home" element={<Home />} />
        </Routes>
        </StoreProvider>
        </div>
      </Router>
  
   </ApolloProvider>
 )
}
export default App;

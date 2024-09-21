import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { onAuthStateChanged } from "firebase/auth"; // Import Firebase auth
import { auth } from './firebase'; // Import your firebase config
import Login from './components/Login';
import PostList from './components/PostList';
import Search from './components/Search';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={isAuthenticated ? (
            <>
              <Search />
              <PostList />
            </>
          ) : (
            <Login />
          )} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;

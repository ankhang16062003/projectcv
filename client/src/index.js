import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {AuthProvider} from './context/authContext/AuthContext'
import {ListUsersContextProvider} from './context/listUsersContext/ListUsersContext'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ListUsersContextProvider>
        <App />
      </ListUsersContextProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

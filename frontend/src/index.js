import React from 'react';
import ReactDOM from 'react-dom';

import AllChars from './components/AllChars';

const App = () => {
  return (
    <AllChars/>
  );
};

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
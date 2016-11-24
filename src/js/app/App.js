
import React, { PropTypes } from 'react';
import Header from './components/Header';

const App = (props) => {
  return (
    <div className="container">
      <Header/>
      {props.children}
    </div>
  );
};

App.propTypes = {
    children: PropTypes.element
};

export default App;


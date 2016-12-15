
import React, { PropTypes } from 'react';
import Header from './components/Header';
import MetisMenu from 'react-metismenu';

const content=[
    {
        icon: 'bath',
        label: 'Label of Item',
        to: '#a-link'
    },
    {
        icon: 'shower',
        label: 'Second Item',
        content: [
            {
                icon: 'microchip',
                label: 'Sub Menu of Second Item',
                to: '#another-link'
            }
        ]
    }
];

const App = (props) => {
  return (
    <div>
       <nav className="navbar-default navbar-static-side" role="navigation">
          <MetisMenu content={content} activeLinkFromLocation />
       </nav>
       {props.children}
    </div>
  );
};

App.propTypes = {
    children: PropTypes.element
};

export default App;


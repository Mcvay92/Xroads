import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import NavBar from '../../components/NavBar';

it('renders without crashing', () => {
  const div = document.createElement('div');
      <BrowserRouter>
        ReactDOM.render(<NavBar />, div);
      </BrowserRouter>
      ReactDOM.unmountComponentAtNode(div);
});

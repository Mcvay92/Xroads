import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Home from '../../components/Home';

it('renders without crashing', () => {
  const div = document.createElement('div');
      <BrowserRouter>
        ReactDOM.render(<Home />, div);
      </BrowserRouter>
      ReactDOM.unmountComponentAtNode(div);
});

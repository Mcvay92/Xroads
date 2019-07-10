import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../../components/Routes';

it('renders without crashing', () => {
  const div = document.createElement('div');
      <BrowserRouter>
        ReactDOM.render(<Routes />, div);
      </BrowserRouter>
      ReactDOM.unmountComponentAtNode(div);
});

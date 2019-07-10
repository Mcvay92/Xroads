import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Organizations from '../../components/Resources/Organizations';

it('renders without crashing', () => {
  const div = document.createElement('div');
      <BrowserRouter>
    ReactDOM.render(
          <Organizations />
, div);
      </BrowserRouter>;
      ReactDOM.unmountComponentAtNode(div);
});

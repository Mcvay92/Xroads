import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Incubators from '../../components/Incubators';

it('renders without crashing', () => {
  const div = document.createElement('div');
      <BrowserRouter>
    ReactDOM.render(
          <Incubators />
, div);
      </BrowserRouter>;
      ReactDOM.unmountComponentAtNode(div);
});

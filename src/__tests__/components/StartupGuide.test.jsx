import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import StartupGuide from '../../components/StartupGuide/StartupGuide';

it('renders without crashing', () => {
  const div = document.createElement('div');
      <BrowserRouter>
    ReactDOM.render(
          <StartupGuide />
, div);
      </BrowserRouter>;
      ReactDOM.unmountComponentAtNode(div);
});

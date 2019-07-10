import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Courses from '../../components/Courses';

it('renders without crashing', () => {
  const div = document.createElement('div');
      <BrowserRouter>
    ReactDOM.render(
          <Courses />
, div);
      </BrowserRouter>;
      ReactDOM.unmountComponentAtNode(div);
});

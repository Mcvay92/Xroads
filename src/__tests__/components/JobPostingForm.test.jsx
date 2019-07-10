import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import JobPostingForm from '../../components/JobPostingForm';

// eslint-disable-next-line no-undef
it('renders without crashing', () => {
  const div = document.createElement('div');
      <BrowserRouter>
        ReactDOM.render(<JobPostingForm />, div);
      </BrowserRouter>
      ReactDOM.unmountComponentAtNode(div);
});

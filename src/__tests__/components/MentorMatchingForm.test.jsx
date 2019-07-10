import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import MentorMatchingForm from '../../components/MentorMatchingForm';

test('renders without crashing', () => {
  const div = document.createElement('div');
      <BrowserRouter>
        ReactDOM.render(<MentorMatchingForm />, div);
      </BrowserRouter>
      ReactDOM.unmountComponentAtNode(div);
});
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import JobPostingCard from '../../components/JobPostingCard';

it('renders without crashing', () => {
  const div = document.createElement('div');
      <BrowserRouter>
        ReactDOM.render(<JobPostingCard />, div);
      </BrowserRouter>
      ReactDOM.unmountComponentAtNode(div);
});

// eslint-disable-next-line no-undef
test('renders with data', () => {
  const data = {
    StartUp: 'Test',
    SkillsNeeded: 'Many',
    Contact: 'contact',
  };
  const div = document.createElement('div');
  const component = renderer.create(<JobPostingCard {...{ data }} />, div);
  const jsonComp = component.toJSON();
  // eslint-disable-next-line no-undef
  expect(jsonComp.children[0].children[0].props.title).toBe('Test');
  ReactDOM.unmountComponentAtNode(div);
});

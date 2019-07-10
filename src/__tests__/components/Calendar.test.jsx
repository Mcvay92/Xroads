import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Calendar from '../../components/Calendar';


//  TDD Tests using Jest

// eslint-disable-next-line no-undef
test('renders without crashing', () => {
  const div = document.createElement('div');
      <BrowserRouter>
        ReactDOM.render(<Calendar />, div);
      </BrowserRouter>
      ReactDOM.unmountComponentAtNode(div);
});


//  BDD Tests using Jest

// eslint-disable-next-line no-undef
test('As a user I want to see the google calendar', () => {
  const div = document.createElement('div');
  const component = renderer.create(<Calendar />, div);

  const jsonComp = component.toJSON();

  // eslint-disable-next-line no-undef
  expect(jsonComp.children[0].children[1].children[0].props.src).toBe('https://calendar.google.com/calendar/embed?src=8210veguh4d59c70bnvm8t8mvk%40group.calendar.google.com&ctz=America%2FChicago');
  ReactDOM.unmountComponentAtNode(div);
});

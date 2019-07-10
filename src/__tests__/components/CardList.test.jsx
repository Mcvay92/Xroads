import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import CardList from '../../components/CardList';

it('renders without crashing', () => {
  const div = document.createElement('div');
      <BrowserRouter>
        ReactDOM.render(<CardList />, div);
      </BrowserRouter>
      ReactDOM.unmountComponentAtNode(div);
});

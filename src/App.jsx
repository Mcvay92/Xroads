import React, { Component } from 'react';
import NavBar from './components/NavBar';
import Routes from './components/Routes';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#000000' }, // Purple and green play nicely together.'
    secondary: { main: '#33373d' },
  },
  typography: { useNextVariants: true },
});

export default class App extends Component {
  /*
  //Below is an example of how to call the node js backend
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      greeting: ''
    };
     fetch(`/api/database`)
            .then(response => response.json())
            .then(state => this.setState(state));
  }
  //This would then go into the render function in this example
  <p>{this.state.greeting}</p>
*/

  render = () => (
      <MuiThemeProvider theme={theme}>
          <div>
              <NavBar />
              <Routes />
          </div>
      </MuiThemeProvider>
  );
}

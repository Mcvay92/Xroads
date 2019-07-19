import React, { Component } from 'react';
import NavBar from './components/NavBar';
import Routes from './components/Routes';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
    palette: {
        primary: {main: '#000000'}, // Purple and green play nicely together.'
        secondary: {main: '#33373d'},
    },
    typography: {useNextVariants: true},
});

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUser: localStorage.getItem('access_token') ? true : false
        };
    }
    render = () => (
                <MuiThemeProvider theme={theme}>
                    <div>
                        <NavBar isUser={this.state.isUser} />
                        <Routes />
                    </div>
                </MuiThemeProvider>
                );
}

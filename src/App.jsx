import React, { Component } from 'react';
import NavBar from './components/NavBar';
import Routes from './components/Routes';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
const theme = createMuiTheme({
    palette: {
        primary: {main: '#000000'}, 
        secondary: {main: '#33373d'},
    },
    typography: {useNextVariants: true},
});

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUser: localStorage.getItem('access_token') ? true : false,
            isValidToken: localStorage.getItem('token_valid')
        };
    }
    componentDidUpdate() {
        let isUserValue = localStorage.getItem('access_token') ? true : false;
        let validToken = localStorage.getItem('token_valid') === 'true' ? true : false;
        if (this.state.isUser !== isUserValue) {
            this.setState({isUser: isUserValue, isValidToken:validToken})
        }
    }
    render = () => (
                <MuiThemeProvider theme={theme}>
                    <NavBar isUser={this.state.isUser} validToken={this.state.isValidToken}/>
                    <div className="container mt-50 mb-50">
                        <Routes />
                    </div>
                </MuiThemeProvider>
                );
}

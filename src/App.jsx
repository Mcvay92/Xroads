import React, { Component } from 'react';
import NavBar from './components/NavBar';
import PropTypes from 'prop-types';
import dotenv from 'dotenv';
import Routes from './components/Routes';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
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
    componentDidUpdate() {
        let isUserValue = localStorage.getItem('access_token') ? true : false
        if (this.state.isUser !== isUserValue) {
            this.setState({isUser: isUserValue})
        }
    }
    render = () => (
                <MuiThemeProvider theme={theme}>
                    <NavBar isUser={this.state.isUser} />
                    <div className="container mt-10">
                        <Routes />
                    </div>
                </MuiThemeProvider>
                );
}

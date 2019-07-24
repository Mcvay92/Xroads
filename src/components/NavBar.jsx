import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import { withStyles }
from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import App from '../App';
const styles = theme => ({
        fontFamilys: {
            fontFamily: 'Adamina, serif',
            flexWrap: 'wrap',
        },
        mr20: {
            marginRight: '20px',
        },
        hide: {
            display: 'none'
        },
        currentNav: {
            position: 'absolute',
            right: '0px'
        }
    });
class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: 0,
            userSigned: localStorage.getItem('access_token') ? true : false
        };
        this.logout = this.logout.bind(this)
    }
    logout() {
        const {isUser, history} = this.props;
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        this.context.router.history.push('/');
    }
    render() {
        const {classes, isUser} = this.props;
        console.log(isUser, 'isUser')
        const {currentTab, userSigned} = this.state;
        return (
                <div>
                    <AppBar position="static">
                        <Toolbar>
                            <Avatar src="https://bit.ly/2IjUqrM" className={classes.mr20}/>
                            <Typography className={classes.fontFamilys}>
                                Cross Roads
                            </Typography>
                            <Tabs value={currentTab} className={classes.currentNav}>
                                {this.props.isUser && (
                                            <Tab id="guidetab" label="Roadmap" component={Link} to="/howtostartup"/>
                                                    )}
                                <Tab id="hometab" label="Home" component={Link} to="/"/>
                                {this.props.isUser && (
                                    <Tab id="calendartab" label="Calendar" component={Link} to="/calendar"/>
                                            )}
                                <Tab
                                    id="mentorMatchingTab"
                                    label="Mentor Matching"
                                    component={Link}
                                    to="/mentorMatchingForm"
                                    />
                                {!this.props.isUser && (
                                    <Tab id="signin" label="SignIn" component={Link} to="/signin" />
                                            )}
                                {!this.props.isUser && (
                                    <Tab id="signup" label="SignUp" component={Link} to="/signup" />
                                            )}
                                {this.props.isUser && (
                                    <Tab id="profile" label="Profile" component={Link} to="/profile" />
                                            )}
                                {this.props.isUser && (
                                    <Tab id="profile" label="Logout" onClick={this.logout}/>
                                            )}
                
                            </Tabs>
                        </Toolbar>
                    </AppBar>
                </div>
                )
    }
}
NavBar.propTypes = {
// eslint-disable-next-line react/forbid-prop-types
    classes: PropTypes.object.isRequired,
};
NavBar.contextTypes = {
    router: PropTypes.func.isRequired
};
export default withStyles(styles)(NavBar);

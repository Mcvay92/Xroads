import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router, Route, Link, Redirect, NavLink,
} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import startupProfileSymbol from '../assets/images/rocket.svg';
import joinTeamSymbol from '../assets/images/team.svg';
import localResourcesSymbol from '../assets/images/book.svg';
import startProjectSymbol from '../assets/images/add.svg';
import logoutSymbol from '../assets/images/logout.svg';
import logoC from '../assets/images/alphabetC.png';

// import ListSubheader from '@material-ui/core/ListSubheader';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import Typography from '@material-ui/core/Typography';
// import Tab from '@material-ui/core/Tab';
// import { withRouter } from 'react-router-dom';
// import Divider from '@material-ui/core/Divider';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import Button from '@material-ui/core/Button';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Paper from '@material-ui/core/Paper';
// import Tabs from '@material-ui/core/Tabs';
// import App from '../App';
// import Collapse from '@material-ui/core/Collapse';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import DraftsIcon from '@material-ui/icons/Drafts';
// import SendIcon from '@material-ui/icons/Send';
// import ExpandLess from '@material-ui/icons/ExpandLess';
// import ExpandMore from '@material-ui/icons/ExpandMore';
// import StarBorder from '@material-ui/icons/StarBorder';
// import Toolbar from '@material-ui/core/Toolbar';

const styles = theme => ({
  fontFamilys: {
    fontFamily: 'Adamina, serif',
    flexWrap: 'wrap',
  },
  mr20: {
    marginRight: '20px',
  },
  hide: {
    display: 'none',
  },
  currentNav: {
    display: 'flex',
    flexDirection: 'column',
  },
  root: {
    maxWidth: 360,
    BackgroundColor: 'yellow',
    marginLeft: '-13px',
    paddingTop: '0',
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  squareAvatar: {
    borderRadius: '0',
  },
  tab: {
    paddingLeft: '24px',
    paddingRight: '24px',
  },
  avatarSmall: {
    width: '13%',
    height: '13%',
    marginLeft: '5px',
  },
  white: {
    color: 'white',
  },
  yellowBackTab: {
    BackgroundColor: 'yellow',
    paddingLeft: '24px',
    paddingRight: '24px',
  },
});

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0,
      isOpen: localStorage.getItem('token_valid') !== 'true',
      isDialog: typeof localStorage.getItem('access_token') === 'string',
      userSigned: !!localStorage.getItem('access_token'),
    };
    this.logout = this.logout.bind(this);
  }

  logout() {
    const { isUser, history } = this.props;
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    this.setState({ userSigned: false });
    localStorage.setItem('token_valid', false);
    this.context.router.history.push('/signin');
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    const { classes, isUser } = this.props;
    const {
      currentTab, userSigned, isOpen, isDialog,
    } = this.state;
    return (
      <div className={this.props.isOpenedInSm ? 'opened-in-sm' : 'closed-in-sm'}>
        <AppBar position="static">
          <div style={{ width: '250px' }}>
            <List component="nav" className={classes.root}>
              <ListItem button className={classes.yellowBackTab} component={NavLink} {...{ to: '/' }}>
                <ListItemAvatar className={classes.squareAvatar}>
                  <Avatar
                    alt="Avatar"
                    className={classes.avatarSmall}
                    src={logoC}
                  />
                </ListItemAvatar>
                <ListItemText primary="X Roads" />
              </ListItem>
              <hr />
              <ListItem
                button
                className={classes.tab}
                component={NavLink}
                {...{
                  to: isUser ? '/profile' : '/signin',
                  activeClassName: 'selected-nav',
                  exact: true,
                }}
              >
                <ListItemAvatar className={classes.squareAvatar}>
                  <Avatar alt="Avatar" className={classes.avatarSmall} src={startupProfileSymbol} />
                </ListItemAvatar>
                <ListItemText primary={isUser ? 'Startup Profile' : 'sign in'} />
              </ListItem>
              <ListItem
                button
                className={classes.tab}
                component={NavLink}
                {...{ to: '/join-now', activeClassName: 'selected-nav', exact: true }}
              >
                <ListItemAvatar className={classes.squareAvatar}>
                  <Avatar alt="Avatar" className={classes.avatarSmall} src={joinTeamSymbol} />
                </ListItemAvatar>
                <ListItemText primary="Join a team" />
              </ListItem>
              <ListItem
                button
                className={classes.tab}
                component={NavLink}
                {...{ to: '/organizations', activeClassName: 'selected-nav', exact: true }}
              >
                <ListItemAvatar className={classes.squareAvatar}>
                  <Avatar alt="Avatar" className={classes.avatarSmall} src={localResourcesSymbol} />
                </ListItemAvatar>
                <ListItemText primary="local Resources" />
              </ListItem>
              <ListItem
                button
                className={classes.tab}
                component={NavLink}
                {...{ to: '/addProfile', activeClassName: 'selected-nav', exact: true }}
              >
                <ListItemAvatar className={classes.squareAvatar}>
                  <Avatar alt="Avatar" className={classes.avatarSmall} src={startProjectSymbol} />
                </ListItemAvatar>
                <ListItemText primary="start a project" />
              </ListItem>
              {isUser ? (
                <ListItem
                  button
                  className={classes.tab}
                  component={NavLink}
                  {...{ to: '/signin', activeClassName: 'selected-nav', exact: true }}
                  onClick={() => {
                    this.logout();
                  }}
                >
                  <ListItemAvatar className={classes.squareAvatar}>
                    <Avatar alt="Avatar" className={classes.avatarSmall} src={logoutSymbol} />
                  </ListItemAvatar>
                  <ListItemText primary="logout" />
                </ListItem>
              ) : null}
            </List>
          </div>
        </AppBar>
      </div>
    );
  }
}
NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};
NavBar.contextTypes = {
  router: PropTypes.object.isRequired,
};
export default withStyles(styles)(NavBar);

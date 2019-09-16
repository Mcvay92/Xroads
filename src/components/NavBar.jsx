import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import {
  BrowserRouter as Router, Route, Link, Redirect,
} from 'react-router-dom';

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import App from '../App';
import startupProfileSymbol from '../assets/images/rocket.svg';
import joinTeamSymbol from '../assets/images/team.svg';
import localResourcesSymbol from '../assets/images/book.svg';
import startProjectSymbol from '../assets/images/add.svg';

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
    backgroundColor: theme.palette.background.paper,
    marginLeft: '-13px',
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
                        <ListItem button className={classes.tab} component={Link} {...{ to: '/' }}>
                            <ListItemAvatar className={classes.squareAvatar}>
                                <Avatar
                                    alt="Avatar"
                                    className={classes.avatarSmall}
                                    src="https://images.vexels.com/media/users/3/155299/isolated/preview/1988d1faba4d059eb4461d955af5cf61-x-mark-scribble-by-vexels.png"
                                />
                            </ListItemAvatar>
                            <ListItemText primary="X Roads" />
                        </ListItem>
                        <Divider />
                        <ListItem
                            button
                            className={classes.tab}
                            component={Link}
                            {...{ to: this.props.isUser ? '/profile' : '/signin' }}
                        >
                            <ListItemAvatar className={classes.squareAvatar}>
                                <Avatar alt="Avatar" className={classes.avatarSmall} src={startupProfileSymbol} />
                            </ListItemAvatar>
                            <ListItemText primary={this.props.isUser ? 'Startup Profile' : 'sign in'} />
                        </ListItem>
                        <ListItem button className={classes.tab} component={Link} {...{ to: '/' }}>
                            <ListItemAvatar className={classes.squareAvatar}>
                                <Avatar alt="Avatar" className={classes.avatarSmall} src={joinTeamSymbol} />
                            </ListItemAvatar>
                            <ListItemText primary="Join a team" />
                        </ListItem>
                        <ListItem
                            button
                            className={classes.tab}
                            component={Link}
                            {...{ to: '/howtostartup' }}
                        >
                            <ListItemAvatar className={classes.squareAvatar}>
                                <Avatar alt="Avatar" className={classes.avatarSmall} src={localResourcesSymbol} />
                            </ListItemAvatar>
                            <ListItemText primary="local Resources" />
                        </ListItem>
                        <ListItem button className={classes.tab} component={Link} {...{ to: '/addProfile' }}>
                            <ListItemAvatar className={classes.squareAvatar}>
                                <Avatar alt="Avatar" className={classes.avatarSmall} src={startProjectSymbol} />
                            </ListItemAvatar>
                            <ListItemText primary="start your dream project" />
                        </ListItem>
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

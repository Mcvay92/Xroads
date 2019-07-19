import React from 'react';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { userService } from '../../services';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const styles = theme => ({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
            width: 700,
        },
        dense: {
            marginTop: 19,
        },
        menu: {
            width: 200,
        },
        button: {
            margin: theme.spacing.unit,
        },
    });


class Profile extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      profileData: ''
    };
  }

    getData(userId) {
        userService.getProfile(userId)
                .then(
                        response => {
                            this.setState({profileData: response})
                        },
                        error => this.setState({error, loading: false})
                );
    }
    componentDidMount() {
        this.setState({loading: true});
        let userObject = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        let userId = userObject != null ? userObject._id : null
        this.getData(userId);
    }
    render() {

        const {classes} = this.props;
        return (
                <div>profile</div>
                );
    }
}

Profile.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);

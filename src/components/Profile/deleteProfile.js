import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Delete, Edit} from '@material-ui/icons';
import { userService } from '../../services';
import config from '../../config';
import moment from 'moment';
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
            marginTop: 19
        },
        menu: {
            width: 200,
        },
        button: {
            margin: theme.spacing.unit,
        },
    });
class DeleteProfile extends React.Component {
 constructor(props) {
        super(props);
        this.state = {
            profileData: null,
            submitted: false,
            loading: false,
            error: ''
        };
        this.getProfilesData = this.getProfilesData.bind(this);
    }
}
export default DeleteProfile;
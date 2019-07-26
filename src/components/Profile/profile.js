import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Delete, Edit} from '@material-ui/icons';
import { userService } from '../../services';
import config from '../../config';
import moment from 'moment';
import { BrowserRouter as Router, Route, Link }
from 'react-router-dom';
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
            profileData: null,
            submitted: false,
            loading: false,
            error: ''
        };
        this.getProfilesData = this.getProfilesData.bind(this);
    }
    getProfilesData() {
        userService.getAllProfiles()
                .then(
                        response => {
                            this.setState({profileData: response.data, loading: false})
                        },
                        error => this.setState({error: error, loading: false})
                );
    }
    componentDidMount() {
        this.setState({loading: true});
        let userObject = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        let userId = userObject != null ? userObject._id : null;
        this.getProfilesData();
    }
    render() {
        const {classes} = this.props;
        const {profileData} = this.state;
        let profiles;
        if (this.state.profileData != null) {
            profiles = this.state.profileData.map((item, key) =>
                <tr key={item._id}>
                    <td>{key + 1}</td>
                    <td>{item.team_name}</td>
                    <td>{config.stages[item.stage]}</td>
                    <td>{moment(new Date(item.start_date)).format("LL")}</td>
                    <td><Link className="mr-30" to={`/editProfile/${item._id}`}><Edit/></Link> <Link to={`/deleteProfile/${item._id}`}><Delete/></Link></td>
                </tr>
            );
        }
        return (
                <div className="row mt-30">
                    <div className="col-12">
                        <h4>All profiles</h4>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Sr</th>
                                    <th>Team Name</th>
                                    <th>Stage</th>
                                    <th>Start Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            {profileData && profiles &&
                                    <tbody>
                                        {profiles}
                                    </tbody>
                            }
                        </table>
                    </div>
                </div>
                );
    }
}

Profile.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Profile);

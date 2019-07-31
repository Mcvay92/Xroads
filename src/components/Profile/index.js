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
export default class Profile extends React.Component {
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
        let profiles = null;
        if (this.state.profileData != null && this.state.profileData.length > 0) {
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
                <div className="col-12">
                    
                    <h4 className="mb-20">All profiles <span className="float-right"><Link to="/addProfile" className="btn btn-info">Add New Profile</Link></span></h4>
                    {profileData != null && profileData.length > 0 && profiles != null &&
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
                                        <tbody>
                                            {profiles}
                                        </tbody>
                                    </table>}
                    {profileData && profileData.length == 0 &&
                                    <div className="alert alert-info">
                                        No profile added yet.
                                    </div>}
                </div>
                );
    }
}


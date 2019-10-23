import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Delete, Edit} from '@material-ui/icons';
import { userService } from '../../services';
import config from '../../config';
import moment from 'moment';
import {  Link } from 'react-router-dom';
 class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileData: null,
            submitted: false,
            loading: false,
            isOpen:(localStorage.getItem('token_valid') === 'true') ? false : true,
            isDialog:typeof localStorage.getItem('access_token') !== 'string' ? false : true,
            error: ''
        };
        this.getProfilesData = this.getProfilesData.bind(this);
        this.handleClose = this.handleClose.bind(this);
//        this.deleteProfileId = this.deleteProfileId.bind(this);
    }

    deleteProfileId(deleteProfileId) {
        console.log(deleteProfileId,'deleteProfileId');
//        userService.deleteSingleProfile(this.state.deleteProfileId)
//                .then(
//                    response => {
//                    if(response.token === 'invalid'){
//                        this.setState({
//                            isDialog:false,
//                            isOpen:true
//                         });
//                    }else{
//                        this.setState({
//                            isDialog:true,
//                            isOpen:false
//                         });
//                    }
//                    },
//                    error => {
//                        console.log(error, 'error');
//                        this.setState({error: error, loading: false});
//                    }
//                );
    }
    getProfilesData() {
        userService.getAllProfiles()
                .then(
                    response => {
                    if(response.token == 'invalid'){
                        this.setState({
                            isDialog:false,
                            isOpen:true
                         });
                    }else{
                        this.setState({
                            isDialog:true,
                            isOpen:false,
                            profileData:response.data
                         });
                    }
                    },
                    error => {
                        this.setState({error: error, loading: false});
                    }
                );
    }
    handleClose(){
        this.setState({isOpen:false});
         this.context.router.history.push('/signin');
    }
    componentDidMount() {
        this.getProfilesData();
    }
    render() {
        const {classes} = this.props;
        const {profileData} = this.state;
        let profiles = null;
        if (this.state.profileData != null && this.state.profileData.length > 0) {
            profiles = this.state.profileData.map((item, key) =>
                <tr key={item._id}>
                    <td><Link to={`/profile/${item._id}`}>{item.team_name}</Link></td>
                    <td>{config.stages[item.stage]}</td>
                    <td>{moment(new Date(item.start_date)).format("LL")}</td>
                    <td><Link className="mr-30" to={`/editProfile/${item._id}`}><Edit/></Link></td>
                </tr>
            );
        }
        return (
                <div className="col-12">

                    <h4 className="mb-20">All Profiles <span className="float-right"><Link to="/addProfile" className="btn btn-info">Add New Profile</Link></span></h4>
                    {profileData != null && profileData.length > 0 && profiles != null &&
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
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
                    {(this.state.isDialog == false || this.state.isOpen == true) &&
                        <Dialog
                            open={this.state.isOpen}
                            onClose={this.handleClose}
                            aria-labelledby="draggable-dialog-title"
                            >
                            <DialogContent>
                                <DialogContentText>
                                Please Sign up or Sign in to view your profiles.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleClose} color="primary">
                                    Ok
                                </Button>
                            </DialogActions>
                        </Dialog>}
                </div>
                );
    }
}
Profile.contextTypes = {
    router: PropTypes.object.isRequired
};
export default Profile;

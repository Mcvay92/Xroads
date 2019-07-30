import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Form, TextField, ObjectField, ErrorsContainer, ListField, DateField, SelectField, SubmitField } from 'react-components-form';
import { userService } from '../../services';
import { profileSchema } from './schemas';
import FileField from '../common/FileField';
import HiddenField from '../common/HiddenField';
import config from '../../config';
const addButtonProp = { className: 'button button-info', value:'Add Memeber' };
const removeButtonProp = { className: 'button button-info', value:'Remove Memeber' };
const errorClasses = {
    className: 'alert alert-danger',
    fieldClassName:'has-error'
};
const ProfileForm = (props) => {
    let addButtonProp = { className: 'btn btn-info mt-30 mb-20', value:'Add Memeber' };
    let removeButtonProp = { className: 'btn btn-info', value:'Remove Memeber' };
    let profileData = props.profiledata;
    let roleOject = config.roleSelect;
    let stageOject = config.stageSelect;
    return (
        <div className="form-container">
            <TextField  value={profileData ? profileData.team_name : null}  name="team_name" errorStyles={errorClasses} className="form-control"  label="Team Name" placeholder="Team Name" wrapperClassName="form-group" />
            <TextField value={profileData ? profileData.description : null} name="description" errorStyles={errorClasses} className="form-control"  label="Description" placeholder="Description" wrapperClassName="form-group" />
            <TextField value={profileData ? profileData.contact : null} name="contact" errorStyles={errorClasses} className="form-control"  label="Contact" placeholder="Contact" wrapperClassName="form-group" />
            <SelectField value={profileData ? profileData.stage : 0} name="stage" errorStyles={errorClasses} className="form-control" options={stageOject} label="Stage"  wrapperClassName="form-group"/>
            <DateField value={profileData ? new Date(profileData.start_date) : null} name="start_date" errorStyles={errorClasses} className="form-control"  label="Start Date"  wrapperClassName="form-group"/>
            <div className="members-heading"><b>Members:</b></div>
            <ListField value={profileData ? profileData.members : null} name="members" addButton={addButtonProp} removeButton={removeButtonProp} wrapperClassName="member-wrapper" className="member-inner">
                <ObjectField>
                    <TextField name="name"  label="Member Name" className="form-control" wrapperClassName="form-group"/>
                    <TextField name="major" label="Major" className="form-control" wrapperClassName="form-group"/>
                    <TextField name="linkedin"  label="LinkedIn Link" className="form-control" wrapperClassName="form-group"/>
                    <SelectField name="role"  className="form-control" multiple={true} options={roleOject} defaultOption={0} label="Member Role"  wrapperClassName="form-group"/>                                   
                </ObjectField>
            </ListField>
            <FileField name="logo" className="form-control" label="Logo"  wrapperClassName="form-group"></FileField>
        </div>
        )
}
export default class AddProfile extends React.Component {
    state = {
        submitted: false,
        loading: false,
        profileId: false,
        error: ''
    };
    handleChange = name => (event) => {
        this.setState({[name]: event.target.value});
    }
    getProfilesData(profileId) {
        userService.getProfile(profileId)
        .then(
            response => {
            this.setState({profileData: response.data, loading: false});
                    },
            error => this.setState({error: error, loading: false})
            );
    }
    updateProfilesData(formData, profileId) {
        userService.editProfile(formData, profileId)
            .then(
                response => {
                this.setState({profileData: response.data, loading: false});
                        },
                error => this.setState({error: error, loading: false})
            );
    }
    uploadImage(fileData) {
        userService.uploadImage(fileData)
            .then(
                response => {
                this.setState({profileData: response.data, loading: false});
                        },
                error => this.setState({error: error, loading: false})
            );
    }
    addProfilesData(formData) {
        userService.addProfile(formData)
            .then(
                    response => {
                    this.setState({profileData: response.data, loading: false});
                },
                    error => this.setState({error: error, loading: false})
                );
    }
    componentWillMount() {
        const {match: {params}} = this.props;
        console.log(this.state.profileData, 'this.state.profileData - before')
        if (params.id !== undefined){
            this.getProfilesData(params.id);
            this.setState({profileId:params.id})
        }
        console.log(this.state.profileData, 'this.state.profileData - after')
    }
    submitProfile(data){
        let userData= JSON.parse(localStorage.getItem('user'));
        data['user_id'] = userData._id;
        this.setState({loading: true});
        if (this.state.profileId){
            this.updateProfilesData(data, this.state.profileId)
        } else{
            this.addProfilesData(data)
        }
    };
    render() {
        return (
                <div className="col-sm-6 margin-auto float-none">
                    <Typography gutterBottom variant="headline" component="h1">{this.state.profileId ? "Edit" : "Add"} Profile</Typography>
                    <Form
                        schema={profileSchema}
                        onSubmit={data => this.submitProfile(data)} className="custom-form"
                        onError={(errors) => console.log('error', errors)}
                        >        
                        {this.state.profileData &&
                        <ProfileForm profiledata={this.state.profileData} /> }
                        {!this.state.profileData &&
                        <ProfileForm profiledata={null}/> }
                        <div className="mt50">
                            <SubmitField className="btn btn-success" value="Save"/>         
                        </div>
                    </Form>
                </div>
        );
    }
};

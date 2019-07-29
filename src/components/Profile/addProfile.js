import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Schema from 'form-schema-validation';
import { Form, TextField, ObjectField, ErrorsContainer, ListField, DateField, SelectField, SubmitField } from 'react-components-form';
import { userService } from '../../services';
import FileField from '../common/FileField';
import config from '../../config';
const classes = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 700
    },
    mt50:{
       marginbottom:'50px'
    },
    dense: {
        marginTop: 19
    },
    menu: {
        width: 200
    },
    button: {
        margin: theme.spacing.unit
    }
});
const errorClasses = {
    className: 'alert alert-danger',
    fieldClassName:'has-error'
};
const memberSchema = new Schema({
    role:{
        type: String,
        errorStyles: "alert"
   },
   name:{
        type: String,
        errorStyles: "alert"
   },
   major:{
        type: String,
         errorStyles: "alert"
    },
   linkedin:{ 
        type: String,
        errorStyles: "alert"
    }
});
const profileSchema = new Schema({
    team_name: {
        type: String,
        required: true,
        errorStyles: "alert"
    },
    user_id: {
        type: String
    },
    description: {
        type: String,
        errorStyles: "alert"
    },
    stage: {
        type: String,
        errorStyles: "alert"
    },
    role: {
        type: String,
        errorStyles: "alert"
    },
    start_date: {
        type: Date,
        errorStyles: "alert"
    },
    contact:{
        type: String,
        errorStyles: "alert"
    },
    logo: {
        type: String,
        errorStyles: "alert"
    },
    members: {
        type: [memberSchema]
    }
});

class AddProfile extends React.Component {
    state = {
        submitted: false,
        loading: false,
        profileData:null,
        stageOject: config.stageSelect,
        roleOject: config.roleSelect,
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
    componentDidMount() {
        const {match: {params}} = this.props;
        console.log(params, 'params', params.id);
        if (params.id !== undefined){
            this.getProfilesData(params.id);
        }
    }
    submitProfile(data){
        console.log(data, 'data')
        this.setState({loading: true});
         const {match: {params}} = this.props;
            console.log('params id', params.id);
        userService.editProfile(data, params.id)
            .then(user => {
                    const {from} = this.props.location.state || {from: {pathname: "/"}};
                    this.props.history.push(from);
            },
                error => this.setState({error, loading: false})
            );
        }
    render() {
        const {classes} = this.props;
        const {stageOject,profileData, roleOject} = this.state;
        const addButtonProp = { className: 'button button-info', value:'Add Memeber' };
        const removeButtonProp = { className: 'button button-info', value:'Remove Memeber' };
        console.log(profileData, 'profileData');
        return (
                <div className="col-sm-6 margin-auto">
                    <Typography gutterBottom variant="headline" component="h1">Edit Profile</Typography>
                    <Form
                        schema={profileSchema}
                        onSubmit={data => this.submitProfile(data)} className="custom-form"
                        onError={(errors) => console.log('error', errors)}
                        >
                        {profileData && 
                        <div className="signin-ask-password-content-block">
                            <TextField value={profileData ? profileData.team_name : null}  name="team_name" errorStyles={errorClasses} className="form-control"  label="Team Name" placeholder="Team Name" wrapperClassName="form-group" />
                            <TextField value={profileData ? profileData.description : null} name="description" errorStyles={errorClasses} className="form-control"  label="Description" placeholder="Description" wrapperClassName="form-group" />
                            <SelectField value={profileData ? profileData.stage : null} name="stage" errorStyles={errorClasses} className="form-control" options={stageOject} defaultOption={0} label="Stage"  wrapperClassName="form-group"/>                                         
                            <SelectField value={profileData ? profileData.role : null} name="role" errorStyles={errorClasses} className="form-control" options={roleOject} defaultOption={0} label="Role"  wrapperClassName="form-group"/>                                         
                            <DateField value={profileData ? new Date(profileData.start_date) : null} name="start_date" errorStyles={errorClasses} className="form-control"  label="Start Date"  wrapperClassName="form-group"/>                                         
                            <ListField value={profileData ? profileData.members : null} name="members" minLength={1} addButton={addButtonProp} removeButton={removeButtonProp}>
                                <ObjectField>
                                    <TextField name="name" label="Member Name" className="form-control" wrapperClassName="form-group"/>
                                    <TextField name="major" label="Major" className="form-control" wrapperClassName="form-group"/>
                                    <TextField name="linkedin" label="LinkedIn Link" className="form-control" wrapperClassName="form-group"/>
                                    <SelectField name="role" className="form-control" options={roleOject} defaultOption={0} label="Member Role"  wrapperClassName="form-group"/>                                   
                                </ObjectField>
                            </ListField>            
                        </div>}
                        <div className="mt50">
                            <SubmitField className="button" value="Save"/>         
                        </div>
                    </Form>
                </div>
                );
             }
};
AddProfile.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(classes)(AddProfile);

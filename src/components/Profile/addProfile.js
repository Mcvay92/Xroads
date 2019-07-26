import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Schema from 'form-schema-validation';
import { Form, TextField, ErrorsContainer, CheckboxField, SelectField, SubmitField } from 'react-components-form';
import { userService } from '../../services';
import config from '../../config';
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
    const errorClasses = {
    className: 'alert alert-danger',
    fieldClassName:'has-error'
};
const profileSchema = new Schema({
    team_name: {
        type: String,
        required: true,
        errorStyles: "alert"
    },
    description: {
        type: String,
        errorStyles: "alert"
    },
        stage: {
        type: String,
        errorStyles: "alert"
    },
        start_date: {
        type: String,
        errorStyles: "alert"
    },
        contact:{
        type: String,
        errorStyles: "alert"
    },
        logo: {
        type: String,
        errorStyles: "alert"
    }
});
class AddProfile extends React.Component {
    state = {
        team_name: '',
        description: '',
        stage: '',
        start_date: '',
        contact: '',
        logo: '',
        role: '',
        submitted: false,
        loading: false,
        stagesOject: config.stages,
        error: ''
    };
    handleChange = name => (event) => {
            this.setState({[name]: event.target.value});
        }
    ;
            componentDidMount() {
        const {match: {params}} = this.props;
        console.log(params, 'params')
    }
    submitProfile = (event) => {
        event.preventDefault();
        this.setState({submitted: true});
        const {team_name, description, stage, start_date, contact, logo, role} = this.state;
        if (!(team_name)) {
            return;
        }
        this.setState({loading: true});
        userService.addProfile({team_name: team_name, description: description, stage: stage, start_date: start_date, contact: contact, logo: logo, role: role})
                .then(user => {
                            const {from} = this.props.location.state || {from: {pathname: "/"}};
                            this.props.history.push(from);
                        },
                        error => this.setState({error, loading: false})
                );
    }
    render() {
        const {classes} = this.props;
        const {stagesOject} = this.state;
        console.log(stagesOject, 'stagesOject');
        return (
                    <div className="col-sm-6 margin-auto">
                            <Typography gutterBottom variant="headline" component="h1">Edit Profile</Typography>
                            <Form
                                schema={profileSchema}
                                onSubmit={data => this.submitProfile(data)} className="custom-form"
                                onError={(errors, data) => console.log('error', errors, data)}
                                >
                                <div className="signin-ask-password-content-block">
                                    <TextField  name="team_name" errorStyles={errorClasses} className="form-control"  label="Team Name" placeholder="Team Name" wrapperClassName="form-group" />
                                    <TextField  name="username" errorStyles={errorClasses} className="form-control"  label="Email" placeholder="you@email.com" wrapperClassName="form-group" />
                                </div>
                                <div className="signin-ask-password-footer-block">
                                    <SubmitField className="button" value="Save"  />         
                                </div>
                            </Form>
                    </div>
                );
    }
}
AddProfile.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(AddProfile);

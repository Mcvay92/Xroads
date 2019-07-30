import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import config from '../../config';
import Button from '@material-ui/core/Button';
import { userService } from '../../services';
import { Form, TextField,SelectField, SubmitField } from 'react-components-form';
import Schema from 'form-schema-validation';
import { BrowserRouter as Router, Route, Link }
from 'react-router-dom';

const signupSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});


class SignUp extends React.Component {
    state = {
            submitted: false,
            loading: false,
            error: ''
    };
    handleSubmit(data){
        this.setState({ submitted: true });
        this.setState({ loading: true });
        userService.signUp(data)
        .then(
            user => {
            const { from } = this.props.location.state || { from: { pathname: "/" } };
                    this.props.history.push(from);
            },
            error => this.setState({ error, loading: false })
        );
}
render() {
        return (
                <div className="col-sm-6 margin-auto float-none">
                    <Typography gutterBottom variant="headline" component="h1">Sign In Here</Typography>
                    <div  className="form-container">
                        <Form
                            schema={signupSchema}
                            onSubmit={model => this.handleSubmit(model)}
                            onError={(errors, model) => console.log('error', errors, model)}
                            >
                            <TextField name="email" label="Email" className="form-control" wrapperClassName="form-group" type="text" />
                            <TextField name="password" label="Password" className="form-control" wrapperClassName="form-group" type="password" />
                            <SelectField name="role"  className="form-control" multiple={true} options={config.roleSelect} defaultOption={0} label="Member Role"  wrapperClassName="form-group"/>                                             
                            <SubmitField value="Submit" className="btn btn-success mb-20" />
                        </Form>
                        <p>Already a user? Sign In <Link to="/signup">Here</Link></p>
                    </div>
                </div>

                );
            }
}
export default (SignUp);

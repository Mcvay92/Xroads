import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Form, TextField, SubmitField } from 'react-components-form';
import Schema from 'form-schema-validation';
import { userService } from '../../services';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const loginSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
class SignIn extends React.Component {
  state = {
            submitted: false,
            loading: false,
            error: ''
  };

  handleSubmit(data){
    // Make a network call somewhere
        if (!(data.email && data.password)) {
            return;
        }

        this.setState({ loading: true });
        userService.signIn(data)
            .then(
                user => {
                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                    this.props.history.push(from);
                },
                error => this.setState({ error, loading: false })
            );
  }

  render() {
    const { classes } = this.props;

    return (
        <div className="col-sm-6 margin-auto float-none">
            <Typography gutterBottom variant="headline" component="h1">Sign In Here</Typography>
            <div  className="form-container">
             <Form
        schema={loginSchema}
        onSubmit={model => this.handleSubmit(model)}
        onError={(errors, model) => console.log('error', errors, model)}
    >
        <TextField name="email" label="Email" className="form-control" wrapperClassName="form-group" type="text" />
        <TextField name="password" label="Password" className="form-control" wrapperClassName="form-group" type="password" />
        <SubmitField value="Submit" className="btn btn-success mb-20" />
    </Form>
            <p>Already a user? Sign In <Link to="/signup">Here</Link></p>
        </div>
        </div>
    );
  }
}

export default (SignIn);

import React from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { Form, TextField, SubmitField } from "react-components-form";
import Schema from "form-schema-validation";
import { userService } from "../../services";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const errorClasses = {
  className: "alert alert-danger",
  fieldClassName: "has-error"
};
const loginSchema = new Schema({
  email: {
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
    errorMsg: null,
    successMsg: null
  };

  handleSubmit(fromData) {
    this.setState({
      loading: true,
      submitted: true,
      errorMsg: null,
      successMsg: null
    });
    userService.signIn(fromData).then(
      data => {
        const { from } = this.props.location.state || {
          from: { pathname: "/" }
        };
        if (data.status == true) {
          this.setState({ successMsg: "You are signed in successfully." });
          setTimeout(() => {
            this.props.history.push(from);
          }, 1000);
        } else {
          this.setState({ errorMsg: data.error });
        }
      },
      error => this.setState({ error, loading: false })
    );
  }
  render() {
    const { classes } = this.props;
    const { errorMsg, successMsg } = this.state;
    return (
      <div className="col-sm-6 margin-auto float-none">
        <Typography gutterBottom variant="headline" component="h1">
          Log In
        </Typography>
        <div className="form-container">
          <Form
            schema={loginSchema}
            onSubmit={model => this.handleSubmit(model)}
            onError={(errors, model) => console.log("error", errors, model)}
          >
            <TextField
              name="email"
              label="Email"
              className="form-control"
              errorStyles={errorClasses}
              wrapperClassName="form-group"
              type="text"
            />
            <TextField
              name="password"
              label="Password"
              className="form-control"
              errorStyles={errorClasses}
              wrapperClassName="form-group"
              type="password"
            />
            <SubmitField value="Log In" className="btn btn-success mb-20" />
            {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
            {successMsg && (
              <div className="alert alert-success">{successMsg}</div>
            )}
          </Form>
          <p>
            Don't have an account? <Link to="/signup">Register</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default SignIn;

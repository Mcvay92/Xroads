import React from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import config from "../../config";
import Button from "@material-ui/core/Button";
import { userService } from "../../services";
import {
  Form,
  TextField,
  SelectField,
  SubmitField
} from "react-components-form";
import Schema from "form-schema-validation";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const errorClasses = {
  className: "alert alert-danger",
  fieldClassName: "has-error"
};
const signupSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});
class SignUp extends React.Component {
  state = {
    submitted: false,
    loading: false,
    errorMsg: null,
    successMsg: null
  };

  handleSubmit(fromData) {
    this.setState({
      submitted: true,
      loading: true,
      errorMsg: null,
      successMsg: null
    });
    userService.signUp(fromData).then(
      data => {
        const { from } = this.props.location.state || {
          from: { pathname: "/" }
        };
        if (data.status == true) {
          this.setState({ successMsg: "You are signed up successfully." });
          setTimeout(() => {
            this.props.history.push(from);
          }, 1000);
        } else {
          this.setState({ errorMsg: data.error });
        }
      },
      error => this.setState({ error })
    );
  }
  render() {
    const { errorMsg, successMsg } = this.state;
    return (
      <div className="col-sm-6 margin-auto float-none">
        <Typography gutterBottom variant="headline" component="h1">
          Register
        </Typography>
        <div className="form-container">
          <Form
            schema={signupSchema}
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
            <SubmitField
              value="Create Account"
              className="btn btn-success mb-20"
            />
          </Form>
          {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
          {successMsg && (
            <div className="alert alert-success">{successMsg}</div>
          )}
          <p>
            Already have an account? <Link to="/signin">Log In</Link>
          </p>
        </div>
      </div>
    );
  }
}
export default SignUp;

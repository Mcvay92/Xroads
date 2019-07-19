import React from 'react';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { userService } from '../../services';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
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


class SignIn extends React.Component {
  state = {
            email: '',
            password: '',
            submitted: false,
            loading: false,
            error: ''
  };

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = (event) => {
    // Make a network call somewhere
    event.preventDefault();
     this.setState({ submitted: true });
        const { email, password, returnUrl } = this.state;

        // stop here if form is invalid
        if (!(email && password)) {
            return;
        }

        this.setState({ loading: true });
        userService.signIn({email:email, password:password})
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
        <div>
            <Typography gutterBottom variant="headline" component="h1">Sign In Here</Typography>
            <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}>

                <TextField
                    id="email"
                    label="Email"
                    style={{ margin: 8 }}
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleChange('email')}
                    multiline
                    fullWidth
                    margin="normal"
                    required
                />

                <TextField
                    id="password"
                    label="Password"
                    style={{ margin: 8 }}
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                    multiline
                    fullWidth
                    margin="normal"
                    required
                />

                <Button variant="contained" className={classes.button} type="submit" id="submitBtn"> Submit </Button>
            </form>
            <p>Already a user? Sign In <Link to="/signup">Here</Link></p>
        </div>
    );
  }
}

SignIn.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);

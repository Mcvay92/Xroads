import React from 'react';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
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


class SignUp extends React.Component {
  state = {
      email: '',
      password: '',
      team_name: '',
      description: '',
      stage: '',
      start_date: '',
      contact: '',
      logo: '',
      role: '',
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
    // alert(this.state.answer1);
   this.setState({ submitted: true });
        const { email, password,  team_name, description, stage, start_date, contact, logo, role } = this.state;

        // stop here if form is invalid
        if (!(email && password)) {
            return;
        }

        this.setState({ loading: true });
        userService.signUp({email:email, password:password, team_name:team_name, description:description, stage:stage, start_date:start_date, contact:contact, logo:logo, role:role})
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
            <Typography gutterBottom variant="headline" component="h1">Sign Up Here</Typography>
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
                <TextField
                    id="team_name"
                    label="Team Name"
                    style={{ margin: 8 }}
                    placeholder="Team Name"
                    value={this.state.team_name}
                    onChange={this.handleChange('team_name')}
                    multiline
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    id="description"
                    label="Description"
                    style={{ margin: 8 }}
                    placeholder="Description"
                    value={this.state.description}
                    onChange={this.handleChange('description')}
                    multiline
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    id="description"
                    label="Stage"
                    style={{ margin: 8 }}
                    placeholder="Stage"
                    value={this.state.stage}
                    onChange={this.handleChange('stage')}
                    multiline
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    id="start_date"
                    label="Start Date"
                    style={{ margin: 8 }}
                    placeholder="Start Date"
                    value={this.state.start_date}
                    onChange={this.handleChange('start_date')}
                    multiline
                    fullWidth
                    margin="normal"
                    required
                />
                <NativeSelect
                        native
                         style={{ margin: 8 }}
                        value={this.state.role}
                        onChange={this.handleChange('role')}
                        inputProps={{
                          name: 'role',
                          id: 'role',
                        }}
                    >
                    <option value="" />
                    <option value={0}>Founder</option>
                    <option value={1}>Co-founder</option>
                    <option value={2}>Other</option>
                 </NativeSelect>
                
                <TextField
                    id="contact"
                    label="Contact"
                    style={{ margin: 8 }}
                    placeholder="Contact"
                    value={this.state.contact}
                    onChange={this.handleChange('contact')}
                    multiline
                    fullWidth
                    margin="normal"
                    required
                />

                <Button variant="contained" className={classes.button} type="submit" id="submitBtn"> Submit </Button>

            </form>
        </div>
    );
  }
}

SignUp.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);

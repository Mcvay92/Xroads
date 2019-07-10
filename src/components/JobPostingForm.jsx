import React from 'react';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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


class TextFields extends React.Component {
  state = {
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    answer5: '',
    answer6: '',
  };

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = (event) => {
    // Make a network call somewhere
    event.preventDefault();
    // alert(this.state.answer1);
    if (this.state.answer1 === '' || this.state.answer2 === '' || this.state.answer3 === '' || this.state.answer4 === '' || this.state.answer5 === '' || this.state.answer6 === '') {
      window.alert('Form not filled out.');
      return;
    }

    fetch(`/api/addJob?name=${encodeURIComponent(this.state.answer1)}&description=${encodeURIComponent(this.state.answer2)}&skills=${encodeURIComponent(this.state.answer3)}&qualifications=${encodeURIComponent(this.state.answer4)}&extra=${encodeURIComponent(this.state.answer5)}&contact=${encodeURIComponent(this.state.answer6)}`)
      .then(response => response.json())
      .then((state) => {
        console.log(state);
        //const jsonRes = JSON.parse(state);
        const jsonRes = state;
        if (jsonRes.Insert === 'Success') {
          window.alert('Successfully posted');
        } else {
          //  @todo add alerts telling why it failed
          window.alert('Post failure');
        }
      });
  }

  render() {
    const { classes } = this.props;

    return (
        <div>
            <Typography gutterBottom variant="headline" component="h1">Post a Job</Typography>
            <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}>

                <TextField
                    id="question1"
                    label="What is your startup named?"
                    style={{ margin: 8 }}
                    placeholder="Enter your answer here"
                    value={this.state.answer1}
                    onChange={this.handleChange('answer1')}
                    multiline
                    fullWidth
                    margin="normal"
                    required
                />

                <TextField
                    id="question2"
                    label="What does your startup do?"
                    style={{ margin: 8 }}
                    placeholder="Enter your answer here"
                    value={this.state.answer2}
                    onChange={this.handleChange('answer2')}
                    multiline
                    fullWidth
                    margin="normal"
                    required
                />

                <TextField
                    id="question3"
                    label="What type of skills are you looking for?"
                    style={{ margin: 8 }}
                    placeholder="Enter your answer here"
                    value={this.state.answer3}
                    onChange={this.handleChange('answer3')}
                    multiline
                    fullWidth
                    margin="normal"
                    required
                />

                <TextField
                    id="question4"
                    label="Specific Qualifications?"
                    style={{ margin: 8 }}
                    placeholder="Enter your answer here"
                    value={this.state.answer4}
                    onChange={this.handleChange('answer4')}
                    multiline
                    fullWidth
                    margin="normal"
                    required
                />

                <TextField
                    id="question5"
                    label="Anything else important?"
                    style={{ margin: 8 }}
                    placeholder="Enter your answer here"
                    value={this.state.answer5}
                    onChange={this.handleChange('answer5')}
                    multiline
                    fullWidth
                    margin="normal"
                    required
                />

                <TextField
                    id="question6"
                    label="Contact Email"
                    style={{ margin: 8 }}
                    placeholder="Enter your answer here"
                    value={this.state.answer6}
                    onChange={this.handleChange('answer6')}
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

TextFields.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);

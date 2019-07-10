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
  constructor() {
    super();

    this.state = {
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      answer5: '',
      answer6: '',
    };
  }

  componentWillMount() {
    this.getData();
  }

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleDeleteClick = () => {
    const uniqueKey = window.prompt('Please enter your unique key:', '');

    if (uniqueKey == null || uniqueKey === '') {
      return;
    }

    fetch(`/api/deleteJob?id=${encodeURIComponent(this.props.match.params.id)}&key=${encodeURIComponent(uniqueKey)}`)
      .then(response => response.json())
      .then((state) => {
        const jsonRes = state;
        if (jsonRes.Delete === 'Success') {
          window.alert('Successfully deleted');
        } else {
          window.alert('Delete failure');
        }
      });
  }

  handleUpdateClick = () => {
    const uniqueKey = window.prompt('Please enter your unique key:', '');

    if (uniqueKey == null || uniqueKey === '') {
      return;
    }

    fetch(`/api/editJobPost?name=${encodeURIComponent(this.state.answer1)}&description=${encodeURIComponent(this.state.answer2)}&skills=${encodeURIComponent(this.state.answer3)}&qualifications=${encodeURIComponent(this.state.answer4)}&extra=${encodeURIComponent(this.state.answer5)}&contact=${encodeURIComponent(this.state.answer6)}&id=${encodeURIComponent(this.props.match.params.id)}&key=${encodeURIComponent(uniqueKey)}`)
      .then(response => response.json())
      .then((state) => {
        const jsonRes = state;
        if (jsonRes.Update === 'Success') {
          window.alert('Successfully updated');
        } else {
          //  @todo add alerts telling why it failed
          window.alert('Update failure');
        }
      });
  }

  getData = () => {
    fetch(`http://localhost:3001/api/jobInfo?id=${this.props.match.params.id}`)
      .then(response => response.json())
      .then((originalData) => {
        this.setState({ answer1: originalData[0].StartUp });
        this.setState({ answer2: originalData[0].Description });
        this.setState({ answer3: originalData[0].SkillsNeeded });
        this.setState({ answer4: originalData[0].Qualifications });
        this.setState({ answer5: originalData[0].Extra });
        this.setState({ answer6: originalData[0].Contact });
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

  render() {
    const { classes } = this.props;

    return (
        <div>
            <Typography gutterBottom variant="headline" component="h1">Job Information</Typography>
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

                <Button variant="contained" className={classes.button} onClick={() => { this.handleUpdateClick(); }} id="updateBtn"> Update Job </Button>
                <Button variant="contained" color="secondary" className={classes.button} onClick={() => { this.handleDeleteClick(); }} id="deleteBtn"> Delete Job </Button>

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

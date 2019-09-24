import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import { userService } from '../../services';

const styles = theme => ({
  root: {
    width: '100%',
    overflow:"auto"
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

function getSteps() {
  return ['Idea/market research', 'Prototype development/team formation', 'Private beta', 'Public beta'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Step 1: Select campaign settings...';
    case 1:
      return 'Step 2: What is an ad group anyways?';
    case 2:
      return 'Step 3: This is the bit I really care about!';
    default:
      return 'Unknown step';
  }
}

class HorizontalNonLinearAlternativeLabelStepper extends React.Component {
  state = {
    lastCompletedStep: this.props.currentStage,
  };

  totalSteps = () => getSteps().length;

  getFormData = object => Object.keys(object).reduce((formData, key) => {
    formData.append(key, object[key]);
    return formData;
  }, new FormData());

  handleStep = step => () => {
    const data = { ...this.props.profileData };
    data.stage =  step;
    

    const userData = JSON.parse(localStorage.getItem('user'));
    data.user_id = userData._id;
    const form = new FormData();
    form.append('team_name', data.team_name);
    form.append('user_id', data.user_id);
    form.append('description', data.description);
    form.append('stage', data.stage);
    form.append('start_date', data.start_date);
    form.append('contact', data.contact);
    form.append('members', JSON.stringify(data.members));
    form.append('roles', JSON.stringify(data.roles));

    userService
      .editProfile(form, data._id)
      .then(() => this.setState({
        lastCompletedStep: step,
      })).catch(err => console.error(err));
  };

  isStepComplete(step) {
    if (this.state.lastCompletedStep === null) {
      return false;
    }
    if (step <= this.state.lastCompletedStep) {
      return true;
    }
    return false;
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
        <div className={classes.root}>
            <Stepper alternativeLabel nonLinear activeStep={activeStep}>
                {steps.map((label, index) => {
                  const props = {};
                  const buttonProps = {};
                  return (
                      <Step key={label} {...props}>
                          <StepButton
                              onClick={this.handleStep(index)}
                              completed={this.isStepComplete(index)}
                              {...buttonProps}
                          >
                              {label}
                          </StepButton>
                      </Step>
                  );
                })}
            </Stepper>
        </div>
    );
  }
}

export default withStyles(styles)(HorizontalNonLinearAlternativeLabelStepper);

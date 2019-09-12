import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import { userService } from '../../services';

const styles = theme => ({
  root: {
    width: '90%',
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
  return ['Idea/market research', 'Prototype', 'Private beta', 'Public beta'];
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
    // const updatedData = { ...this.props.profileData };
    // updatedData.stage =  step;

    // userService
    //   .editProfile(this.getFormData(updatedData), updatedData._id)
    //   .then(res => console.log(res));
    this.setState({
      lastCompletedStep: step,
    });
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

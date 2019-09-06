import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
  return [
    'Select campaign settings',
    'Create an ad group',
    'Create an ad',
    'Select campaign settings',
    'Create an ad group',
    'Create an ad',
  ];
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
    lastCompletedStep: null,
  };

  totalSteps = () => getSteps().length;

  handleStep = step => () => {
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

HorizontalNonLinearAlternativeLabelStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(HorizontalNonLinearAlternativeLabelStepper);

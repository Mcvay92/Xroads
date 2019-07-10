import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import StartupGuide from './StartupGuide';

import './StartupGuide.css';

const styles = theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
});

function getSteps() {
  return [
    'APPLY',
    'MARKET RESEARCH',
    'VALUE PROPOSITION AND PITCH',
    'DEVELOP PROTOTYPE',
    'TEAM FORMATION',
    'BUSINESS MODEL',
    'LAUNCH',
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `Every startup needs an idea. This idea need not be revolutionary in scope, or solve
      complicated world issues. It only needs to solve a problem. Once you have formulated
      such an idea, fill out an application for your startup through Cross Roads application
      process.`;
    case 1:
      return `Now that you have established yourself as a startup, begin researching your consumer
      base. Identify total available and serviceable available markets, along with your target
      market. Evaluate whatever competion you may have in said market. Make use of Research
      Business Databases available on the web to collect said information. After this,
      interview customers to get an idea of what they would want in the product. Use Google,
      LinkedIn, and other social media platforms to find possible customers. Form at least
      three hypotheses before initiating interviews.`;
    case 2:
      return `With the newfound information acquired through the interview process, craft a statement
      that states what your product does, who it is for, what problem it solves, needs it
      fulfills, or pain it relieves. This will be your value proposition. In addition to this,
      create an elevator that lasts about thirty seconds that has the ability to immediately
      sell the product in question. Combine the interview experience, value proposition, pitch
      into one collective entity. This will be your Market EIPD, and will be the foundation
      for the startup.`;
    case 3:
      return `These three steps can be followed in any sequential order, since often the incubation of
      a startup is never a strict linear sequence but rather a multi-dimensional growth.
      Development of the prototype is divided into three stages. The first stage of the
      prototype is its Proof on Concept. It includes basic core functionality along with
      lightweight interface mockups. With such a concept, third-parties should understand the
      product's value and use. The Functioning prototpye is the second stage and should begin
      making the laboratoryto-real-world transition. Students should work on refining or
      expanding the core functionality and building the product’s interface. The prototype
      deliverable should achieve simple use cases.`;
    case 4:
      return `Construct a written Founder's Agreement stating the founders’ names, business’s focus,
      vesting requirements, adding new founders, terminating founder, and other important
      initial details among initial members. Begin recruiting through posting on the job
      listing section of the website. Acquire the necessary members that are required to
      complete the project. Multiple team reformations may be conducted at any point during
      the incubation cycle of the startup.`;
    case 5:
      return `Engineers are passionate about developing products and solutions, however there is much
      more required to run a business. To operate a business, you will need to determine your
      business model. Additionally, you will need to formally write a business plan that
      conveys your business model and business plans. Once you are ready to seek funding banks
      and investors will want to see a thorough business plan. This path will teach you what
      you need for a business model and once finished you will have a written businessplan.
      Create a business model canvas that conveys all keys aspects of the business divided in
      nine sections as seen in a nonexistent picture. Form a business plan from those
      available online to explain the business formally in 30 to 50 pages.`;
    case 6:
      return ` Congratulations on getting this far! Now you must seek out connections including mentors
      and investors that will aid you in making your startup graduate to a bona fide business.`;
    default:
      return 'Unknown step';
  }
}

class VerticalLinearStepper extends React.Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  getStep = () => this.activeStep;

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            <Typography id="stepContent">{getStepContent(index)}</Typography>
                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button
                                        id="backButton"
                                        disabled={activeStep === 0}
                                        onClick={this.handleBack}
                                        className={classes.button}
                                    >
                      Back
                                    </Button>
                                    <Button
                                        id="nextButton"
                                        variant="contained"
                                        color="secondary"
                                        onClick={this.handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length ? this.handleReset() : 0}
        </div>
    );
  }
}

VerticalLinearStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(VerticalLinearStepper);

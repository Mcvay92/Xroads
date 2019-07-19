import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CardList from './CardList';
import JobPostingCard from './JobPostingCard';
import Home from './Home';
import Calendar from './Calendar';
import StartupGuide from './StartupGuide/StartupGuide';
import JobPostingForm from './JobPostingForm';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Profile from './Profile';
import HowToStartup from './StartupGuide/HowToStartup.jsx';
import MentorMatchingForm from './MentorMatchingForm';
import JobPostDetails from './JobPostDetails';

import Incubators from './Resources/Incubators.jsx';
import Organizations from './Resources/Organizations.jsx';
import Courses from './Resources/Courses.jsx';

const JobPostingPage = () => (
    <div>
        <br />
        <Button
            id="formbutton"
            variant="contained"
            color="secondary"
            style={{ 'margin-left': '20px' }}
            href="/jobPostingForm"
        >
      Post a New Job
        </Button>

        <CardList url="http://localhost:3001/api/showAllJobs" filterField="StartUp">
            <JobPostingCard />
        </CardList>
    </div>
);

const Routes = () => (
    <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/calendar" component={Calendar} />
        <Route exact path="/postings" component={JobPostingPage} />
        <Route path="/postings/details/:id" component={JobPostDetails} />
        <Route exact path="/howtostartup" component={StartupGuide} />
        <Route exact path="/jobPostingForm" component={JobPostingForm} />
        <Route exact path="/howtostartup" component={HowToStartup} />
        <Route exact path="/mentorMatchingForm" component={MentorMatchingForm} />

        <Route exact path="/organizations" component={Organizations} />
        <Route exact path="/incubators" component={Incubators} />
        <Route exact path="/courses" component={Courses} />
        <Route exact path="/signIn" component={SignIn} />
        <Route exact path="/signUp" component={SignUp} />
        <Route exact path="/profile" component={Profile} />
    </div>
);

export default Routes;

/**
 * The landing page about our service, how to sign up and where to start goes here.
 */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import NavCard from './NavCard';
// import image from './JoinStartup.jpg'

export default () => (
    <div>
        <Grid container spacing={24} style={{ padding: 24 }}>
            <Grid item xs={6}>
                <NavCard
                    to="/postings"
                    content="Apply and Join Local Startups or Post a Job for Your Startup!"
                    label="Explore Jobs"
                    id="jobPostingBtn"
                    imagelink="./JoinStartup.jpg"
                />
            </Grid>
            <Grid item xs={6}>
                <NavCard
                    to="/calendar"
                    content="Attend Local Entrepreneurial Events and Meet Likeminded People!"
                    label="Explore Events"
                    id="calendarBtn"
                    imagelink="./Cal.jpg"
                />
            </Grid>
            <Grid item xs={6}>
                <NavCard
                    to="/howtostartup"
                    content="Do You Have an Idea for a Startup?"
                    label="Start Here"
                    id="roadmapBtn"
                    imagelink="Start.jpg"
                />
            </Grid>
            <Grid item xs={6}>
                <NavCard
                    to="/mentorMatchingForm"
                    content="Seek Mentorship at a Local Incubator!"
                    label="Become a Mentor"
                    id="mentorBtn"
                    imagelink="./mentorship.jpg"
                />
            </Grid>
        </Grid>
    </div>
);

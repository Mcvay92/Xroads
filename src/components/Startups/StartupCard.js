import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {
    BrowserRouter as Router, Route, NavLink, Redirect,
} from 'react-router-dom';
import moment from 'moment';
import defaultStartupLogo from '../../assets/images/startup.svg';

const styles = theme => ({
    card: {
        height: '325px',
        width: '30%',
        marginBottom: '20px ',
        marginTop: '20px ',
        [theme.breakpoints.down('md')]: {
            width: '30%',
        },
        [theme.breakpoints.down('sm')]: {
            width: '48%',
        },
        [theme.breakpoints.down('xs')]: {
            width: '80%',
            margin: '10px auto',
        },
    },
    media: {
        height: 140,
        margin: 10,
        backgroundSize: 'contain'
    },
    scroll: {
        height: 100,
        overflow: 'auto',
        paddingRight: 5,
    },
    closer: {
        marginTop: '-10px',
        marginBottom: '15px',
        fontSize: '12px',
    },
    greenBG: {
        background: '#5aac44',
        padding: '3px',
        borderRadius: '3px',
        fontSize: '12px',
        marginBottom: '15px',
        color: 'white'
    },
    biggerFont: {
        fontSize: '25px',
    },
});

function StartupCard(props) {
    const { classes, profileData } = props;
    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.media}
                image={profileData.logo ? `https://crossroad-test.s3.us-east-2.amazonaws.com/logo/${profileData.logo}` :
                    defaultStartupLogo}
                title="Contemplative Reptile"
            />
            <CardContent>
                <Grid container justify="space-between" alignItems="center" direction="row">
                    <Typography
                        gutterBottom
                        variant="h5"
                        component={NavLink}
                        {...{ to: `/profile/${profileData._id}` }}
                        className={classes.biggerFont}
                    >
                        {profileData.team_name}
                    </Typography>
                    {profileData.roles ?
                        <Typography gutterBottom variant="h5" component="p" className={classes.greenBG}>
                            Available Roles : {profileData.roles.length}
                        </Typography> : null}

                </Grid>
                {profileData.created_on ? <Typography gutterBottom variant="h5" component="p" className={classes.closer}>
                    <b>Posted on:</b>
                    {' '}
                    {moment(profileData.created_on).format("D-M-YYYY")}
                </Typography> : null}

                <Typography component="p" className={classes.scroll}>
                    {profileData.description}
                </Typography>
            </CardContent>
        </Card>
    );
}

StartupCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StartupCard);

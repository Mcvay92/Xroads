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
  BrowserRouter as Router, Route, Link, Redirect,
} from 'react-router-dom';

const styles = theme => ({
  card: {
    maxWidth: '31%',
    margin: '10px 5px',
    [theme.breakpoints.down('md')]: {
      maxWidth: '32%',
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '48%',
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: '70%',
      margin: '10px auto',
    },
  },
  media: {
    height: 140,
  },
  scroll: {
    height: 100,
    overflow: 'auto',
    paddingRight: 5,
  },
  closer: {
    marginTop: '-5px',
    marginBottom: '15px',
  },
});

function StartupCard(props) {
  const { classes } = props;
  return (
      <Card className={classes.card}>
          <CardMedia
              className={classes.media}
              image="https://revenuesandprofits.com/wp-content/uploads/2019/02/startup.jpg"
              title="Contemplative Reptile"
          />
          <CardContent>
              <Grid container justify="space-between" alignItems="center" direction="row">
                  <Typography gutterBottom variant="h5" component="h3">
            Groupator
                  </Typography>
                  <small>
                      <Typography gutterBottom variant="h5" component="p">
              Available Roles : 2
                      </Typography>
                  </small>
              </Grid>
              <small>
                  <Typography gutterBottom variant="h5" component="p" className={classes.closer}>
                      <b>posted</b>
                      {' '}
in 3/4/1996
                  </Typography>
              </small>
              <Typography component="p" className={classes.scroll}>
          Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
          across all continents except Antarctica Lizards are a widespread group of squamate
          reptiles, with over 6,000 species, ranging across all continents except Antarctica Lizards
          are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
          continents except Antarctica Lizards are a widespread group of squamate reptiles, with
          over 6,000 species, ranging across all continents except Antarctica
              </Typography>
          </CardContent>
      </Card>
  );
}

StartupCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StartupCard);

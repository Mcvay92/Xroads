import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  card: {
    display: 'flex',
    height: 300,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '150%',
    marginLeft: 7,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
});

class ResourcesCard extends Component {
  render() {
    const { classes } = this.props;
    return (
        <Card className={classes.card}>
            <Grid container spacing={16}>
                <Grid item xs={4}>
                    <Button className={classes.image} target="_blank" href={this.props.url}>
                        <img className={classes.img} alt="complex" src={this.props.img} />
                    </Button>
                </Grid>
                <Grid item xs={8}>
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <Typography component="h5" variant="display1" color="textPrimary">
                                {this.props.title}
                            </Typography>
                            <Typography variant="subheading" color="textSecondary">
                                {this.props.description}
                            </Typography>
                        </CardContent>

                        <CardActions className={classes.actions}>
                            <Button
                                variant="outlined"
                                color="primary"
                                className={classes.button}
                                href={this.props.url}
                                target="_blank"
                                style={{ marginLeft: 'auto' }}
                            >
                  Learn More
                            </Button>
                        </CardActions>
                    </div>
                </Grid>
            </Grid>
        </Card>
    );
  }
}

ResourcesCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResourcesCard);

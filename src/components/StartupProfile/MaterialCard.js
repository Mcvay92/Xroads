import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
// import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    textAlign: ' center',
    minHeight: '200px',
    paddingBottom: '0px',
    position: 'relative',
    margin: '2px'
  },
  content: {
    textAlign: ' center',
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '195px',
  },
};

function MaterialCard(props) {
  const { classes, clickable, openModal, ModalData } = props;
  return (
    <Card
      className={classes.card}
      style={{ width: props.CustomWidth ? props.CustomWidth : 'auto' }
      }
      onClick={() => { if (clickable && ModalData.email && ModalData.contact_phone) { openModal(ModalData.email, ModalData.contact_phone) } }}
    >
      <CardContent className={classes.content}>{props.children}</CardContent>
    </Card>
  );
}

export default withStyles(styles)(MaterialCard);

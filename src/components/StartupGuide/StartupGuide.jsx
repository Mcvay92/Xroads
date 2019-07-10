/**
 * Script for startup guide page, explaining how to formulate ideas, teams, progress product
 * through iterations, etc. You can find the information listed in the EngineeringInc program manual
 * PDF at https://engineeringinc.io/wp-content/uploads/2019/01/Engineering-Inc-Program.pdf
 * Card design may be implemented later.
 */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import './StartupGuide.css';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});
// This component servers as a wrapper where the props.children is replaced
// by the content of the component that uses this wrapper
function StartupGuide(props) {
  return <div />;
}

export default withStyles(styles)(StartupGuide);

/*
<div className="sideBar">
    <div className="container">
        <a href="/howtostartup" className="categoryItem">
  How To Start A Startup
        </a>
        <hr />
        <a className="categoryItem">Why Entrepreneurship</a>
    </div>
</div>

<div className="pageContent">
    <div className="container" />
</div>
*/

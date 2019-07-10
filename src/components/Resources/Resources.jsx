/**
 * Script for startup guide page, explaining how to formulate ideas, teams, progress product
 * through iterations, etc. You can find the information listed in the EngineeringInc program manual
 * PDF at https://engineeringinc.io/wp-content/uploads/2019/01/Engineering-Inc-Program.pdf
 * Card design may be implemented later.
 */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import './Resources.css';

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
function Resources(props) {
  return (
      <div>
          <div className="sideBar">
              <div className="container">
                  <h5> A&M Resources </h5>

                  <hr />

                  <NavLink
                      to="/organizations"
                      className="categoryItem"
                      activeStyle={{
                        fontWeight: 'bold',
                        color: 'darkslategray',
                      }}
                  >
            Organizations
                  </NavLink>
                  <hr />

                  <NavLink
                      to="/incubators"
                      className="categoryItem"
                      activeStyle={{
                        fontWeight: 'bold',
                        color: 'darkslategray',
                      }}
                  >
            Incubators
                  </NavLink>
                  <hr />
                  <NavLink
                      to="/courses"
                      className="categoryItem"
                      activeStyle={{
                        fontWeight: 'bold',
                        color: 'darkslategray',
                      }}
                  >
            Entrepreneurship Courses
                  </NavLink>

                  {/*
                    Will add these on later

                  <hr />
                  <a className="categoryItem">Library Resources</a>
                  <hr />
                  <br />
                  <h5> Online Resources </h5>
                  <hr />
                  <a className="categoryItem">Frameworks</a>
                  <hr />

                  <a className="categoryItem">Learning</a>
                  */}
              </div>
          </div>

          <div className="pageContent">
              <div className="container">
                  {props.children}
                  {' '}
              </div>
          </div>
      </div>
  );
}

export default withStyles(styles)(Resources);

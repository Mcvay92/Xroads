import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ItemsCarousel from 'react-items-carousel';
import HorizontalNonLinearStepper from './HorizontalNonLinearStepper';

const avatarDimensions = { height: '190px', width: '190px' };
const socialMediaDimensions = { height: '30px', width: '30px' };

export default class Projects extends Component {
  constructor() {
    super();
    this.state = { activeMemberIndex: 0, activeRoleIndex: 0  };
  }

  render() {
    return (
        <div className="col-sm-10 margin-auto float-none">
            <Grid container justify="center" alignItems="center" direction="column">
                <Avatar alt="Remy Sharp" src="https://bit.ly/2IjUqrM" style={avatarDimensions} />
                <br />
                <Typography gutterBottom variant="headline" component="h2">
            Project
                </Typography>
                <Typography gutterBottom variant="body1" component="p" align="center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, excepturi voluptate
            placeat, nostrum explicabo eos quam at dolor labore consequatur libero consequuntur
            assumenda deserunt cumque id repellat vel velit molestias?
                </Typography>
                <ul className="social-media-list">
                    <li className="social-media-item">
                        <a href="/">
                            <Avatar
                                alt="Remy Sharp"
                                src="https://image.flaticon.com/icons/svg/25/25231.svg"
                                style={socialMediaDimensions}
                            />
                        </a>
                    </li>
                    <li className="social-media-item">
                        <a href="/">
                            <Avatar
                                alt="Remy Sharp"
                                src="https://image.flaticon.com/icons/svg/69/69480.svg"
                                style={socialMediaDimensions}
                            />
                        </a>
                    </li>
                    <li className="social-media-item">
                        <a href="/">
                            <Avatar
                                alt="Remy Sharp"
                                src="https://image.flaticon.com/icons/svg/69/69407.svg"
                                style={socialMediaDimensions}
                            />
                        </a>
                    </li>
                    <li className="social-media-item">
                        <a href="/">
                            <Avatar
                                alt="Remy Sharp"
                                src="https://image.flaticon.com/icons/svg/69/69406.svg"
                                style={socialMediaDimensions}
                            />
                        </a>
                    </li>
                    <li className="social-media-item">
                        <a href="/">
                            <Avatar
                                alt="Remy Sharp"
                                src="https://image.flaticon.com/icons/svg/34/34067.svg"
                                style={socialMediaDimensions}
                            />
                        </a>
                    </li>
                    <li className="social-media-item">
                        <a href="/">
                            <Avatar
                                alt="Remy Sharp"
                                src="https://image.flaticon.com/icons/svg/95/95627.svg"
                                style={socialMediaDimensions}
                            />
                        </a>
                    </li>
                </ul>
                <HorizontalNonLinearStepper />
                
                <div
                    style={{
                      padding: '0 60px',
                      maxWidth: 600,
                      margin: '0 auto',
                      marginTop: '20px',
                    }}
                >
                <Typography gutterBottom variant="headline" component="h3">
            Members
                </Typography>
                    <ItemsCarousel
                        gutter={12}
                        activePosition="center"
                        chevronWidth={60}
                        numberOfCards={4}
                        slidesToScroll={1}
                        outsideChevron
                        showSlither={false}
                        firstAndLastGutter={false}
                        activeItemIndex={this.state.activeMemberIndex}
                        requestToChangeActive={value => this.setState({ activeMemberIndex: value })}
                        rightChevron={<p className="card-controller">{'>'}</p>}
                        leftChevron={<p className="card-controller">{'<'}</p>}
                    >
                        {Array.from(new Array(10)).map((_, i) => (
                            <div     style={{
                                textAlign:"center",
                                paddingTop:"20px",
                                border:"1px solid black",                                
                            }}>
                                <div
                                    style={{
                                        height: "80px",
                                        width:"80px",
                                        margin:"0 auto",
                                        background: 'url(https://image.flaticon.com/icons/svg/181/181549.svg)',
                                        borderRadius: "50%"
                                    }}
                            />
                                <p>Full Name</p>
                            </div>
                        ))}
                    </ItemsCarousel>
                </div>


                <div
                    style={{
                      padding: '0 60px',
                      maxWidth: 600,
                      margin: '0 auto',
                      marginTop: '20px',
                    }}
                >
                <Typography gutterBottom variant="headline" component="h3">
            Roles Available
                </Typography>
                    <ItemsCarousel
                        gutter={12}
                        activePosition="center"
                        chevronWidth={60}
                        numberOfCards={3}
                        slidesToScroll={1}
                        outsideChevron
                        showSlither={false}
                        firstAndLastGutter={false}
                        activeItemIndex={this.state.activeRoleIndex}
                        requestToChangeActive={value => this.setState({ activeRoleIndex: value })}
                        rightChevron={<p className="card-controller">{'>'}</p>}
                        leftChevron={<p className="card-controller">{'<'}</p>}
                    >
                        {Array.from(new Array(10)).map((_, i) => (
                            <div     style={{
                                textAlign:"center",
                                paddingTop:"20px",
                                border:"1px solid black",                                
                            }}>
                                <div
                                    style={{
                                        height: "80px",
                                        width:"80px",
                                        margin:"0 auto",
                                        background: 'url(https://image.flaticon.com/icons/svg/1063/1063299.svg)',
                                    }}
                            />
                                <p>Role</p>
                            </div>
                        ))}
                    </ItemsCarousel>
                </div>

            </Grid>
        </div>
    );
  }
}

import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Modal from 'react-modal';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ItemsCarousel from 'react-items-carousel';
import HorizontalNonLinearStepper from './HorizontalNonLinearStepper';

Modal.setAppElement('#root');


const avatarDimensions = { height: '190px', width: '190px' };
const socialMediaDimensions = { height: '30px', width: '30px' };
const closeStyle = {width: '100%', background: 'black', color: 'white', border: 'none', cursor: 'pointer'};
const customStyles = {  
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default class Projects extends Component {
  constructor() {
    super();
    this.state = { activeMemberIndex: 0, activeRoleIndex: 0, modalIsOpen: false };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({roleMail:"ex@example.com", roleNum:"0021286854355" }, ()=>{this.setState({modalIsOpen: true})});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  getCardsNum = (cardsType) => {
    if (window.innerWidth > 800) {
      if (cardsType === 0) {
        return 4;
      }
      return 3;
    }
    if (window.innerWidth < 800 && window.innerWidth > 400) {
      return 2;
    }
    return 1;
  };

  render() {
    return (
        <div className="col-sm-12 col-lg-8 col-md-10 margin-auto float-none">
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
                <div className="carousel">
                    <Typography gutterBottom variant="headline" component="h3">
              Members
                    </Typography>
                    <ItemsCarousel
                        gutter={12}
                        activePosition="center"
                        chevronWidth={60}
                        numberOfCards={this.getCardsNum(0)}
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
                            <div className="card-wrapper">
                                <div
                                    className="card-image card-image-round"
                                    style={{
                                      background: 'url(https://image.flaticon.com/icons/svg/181/181549.svg)',
                                    }}
                                />
                                <p>Full Name</p>
                            </div>
                        ))}
                    </ItemsCarousel>
                </div>

                <div className="carousel">
                    <Typography gutterBottom variant="headline" component="h3">
              Roles Available
                    </Typography>
                    <ItemsCarousel
                        gutter={12}
                        activePosition="center"
                        chevronWidth={60}
                        numberOfCards={this.getCardsNum(1)}
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
                            <div 
                                className="card-wrapper card-wrapper-clickable"
                                onClick={this.openModal}
                                >
                                <div
                                    className="card-image"
                                    style={{
                                      background: 'url(https://image.flaticon.com/icons/svg/1063/1063299.svg)',
                                    }}
                                />
                                <p>Role</p>
                            </div>
                        ))}
                    </ItemsCarousel>
                </div>
            </Grid>
            <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Role Contacts"
            >
                <h5>Contacts</h5>
                <p>
                    Email:
                    {this.state.roleMail}
                </p>
                <p>
                    Number:
                    {this.state.roleNum}
                </p>
                <button
                    type="button"
                    onClick={this.closeModal}
                    style={closeStyle}
                >
                close
                </button>
            </Modal>
        </div>
    );
  }
}

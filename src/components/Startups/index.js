/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Modal from 'react-modal';
import ReadMoreAndLess from 'react-read-more-less';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ItemsCarousel from 'react-items-carousel';
import { userService } from '../../services';
import StartupCard from './StartupCard';
import facebookLogo from '../../assets/images/facebook.svg';
import linkedinLogo from '../../assets/images/linkedin.svg';
import linkedinLogoSquare from '../../assets/images/linkedin-logo-square.svg';
import twitterLogo from '../../assets/images/twitter.svg';
import githubLogo from '../../assets/images/github.svg';
import phoneLogo from '../../assets/images/phone.svg';
import mailLogo from '../../assets/images/mail.svg';
import addUser from '../../assets/images/add-user.svg';
import userLogo from '../../assets/images/user.svg';
import roleLogo from '../../assets/images/hand-shake.svg';
import addImage from '../../assets/images/add.svg';

export default class Startups extends Component {
  constructor() {
    super();
    this.state = {
      activeMemberIndex: 0,
      activeRoleIndex: 0,
      modalIsOpen: false,
      profileData: null,
      isLoading: true,
    };
    // this.openModal = this.openModal.bind(this);
    // this.closeModal = this.closeModal.bind(this);
    // this.logoUploader = React.createRef();
  }

  // componentDidMount() {
  //   const { id } = this.props.match.params;
  //   userService
  //     .getProfile(id)
  //     .then((response) => {
  //       if (response.token == 'invalid') {
  //         this.props.history.push('/signin');
  //       } else {
  //         this.setState({
  //           profileData: response.data,
  //           isLoading: false,
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       this.setState({ error, isLoading: false });
  //     });
  // }

  //   getCardsNum = (cardsType) => {
  //     if (window.innerWidth > 800) {
  //       if (cardsType === 0) {
  //         return 4;
  //       }
  //       return 3;
  //     }
  //     if (window.innerWidth < 800 && window.innerWidth > 400) {
  //       return 2;
  //     }
  //     return 1;
  //   };

  //   openModal() {
  //     this.setState({ roleMail: 'ex@example.com', roleNum: '0021286854355' }, () => {
  //       this.setState({ modalIsOpen: true });
  //     });
  //   }

  //   closeModal() {
  //     this.setState({ modalIsOpen: false });
  //   }

  //   updatePhoto(logo) {
  //     const data = this.state.profileData;
  //     const userData = JSON.parse(localStorage.getItem('user'));
  //     data.user_id = userData._id;
  //     const imagedata = document.querySelector('input[type="file"]').files[0];
  //     data.logo = imagedata;
  //     const form = new FormData();
  //     form.append('team_name', data.team_name);
  //     form.append('user_id', data.user_id);
  //     form.append('description', data.description);
  //     form.append('stage', data.stage);
  //     form.append('start_date', data.start_date);
  //     form.append('contact', data.contact);
  //     if (data && logo) {
  //       form.append('logo', logo);
  //     }
  //     form.append('members', JSON.stringify(data.members));
  //     form.append('roles', JSON.stringify(data.roles));

  //     userService
  //       .editProfile(form, data._id)
  //       .then(() => document.location.reload())
  //       .catch(err => console.error(err));
  //   }

  render() {
    // if (this.state.isLoading) {
    //   return <div />;
    // }
    // const {
    //   description, team_name, stage, members, roles, logo,
    // } = this.state.profileData;

    return (
        <div className="col-sm-12 margin-auto float-none">
            <Grid container justify="space-between" alignItems="center" direction="row">
                <StartupCard />
                <StartupCard />
                <StartupCard />
                <StartupCard />
                <StartupCard />
                <StartupCard />
                <StartupCard />
                <StartupCard />
                <StartupCard />
            </Grid>
        </div>
    );
  }
}

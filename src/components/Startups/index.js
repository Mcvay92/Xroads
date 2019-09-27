/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import './startups.css';
import ReadMoreAndLess from 'react-read-more-less';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ItemsCarousel from 'react-items-carousel';
import { userService } from '../../services';
import StartupCard from './StartupCard';
import teamDevLogo from '../../assets/images/team-dev.svg';
import ideaLogo from '../../assets/images/lightbulb.svg';


export default class Startups extends Component {
    constructor() {
        super();
        this.state = {
            isTokenValid: typeof localStorage.getItem('access_token') !== 'string' ? false : true,
            isLoading: true,
            profilesData: null,
        };
        // this.openModal = this.openModal.bind(this);
        this.getProfilesData = this.getProfilesData.bind(this);
        // this.logoUploader = React.createRef();
    }

    componentDidMount() {
        this.getProfilesData();
    }

    getProfilesData() {
        userService.getAllUsersProfiles()
            .then(
                (response) => {
                    this.setState({
                        isLoading: false,
                        isOpen: false,
                        profilesData: response.data,
                    });
                },
                (error) => {
                    this.setState({ error, isLoading: false });
                },
            );
    }



    render() {
        const { isLoading, profilesData, isTokenValid } = this.state;
        if (this.state.isLoading) {
            return <div />;
        }
        console.log(isTokenValid);
        return (
            <div className={`col-sm-12 margin-auto float-none`}>
                {isTokenValid ? <Fragment><h4 className=" mb-20">sponsored by Eng inc </h4>
                    <span className="float-right mb-10"><Link to="/addProfile" className="btn btn-info">Create a project</Link></span></Fragment> :
                    <section className="signup-banner">
                        <ul>
                            <li className="flex-spread">
                                <p>Are you looking for a local student startup or project to join at Texas A&M?</p>
                                <img src={teamDevLogo} alt="team" />
                            </li>
                            <li>
                                <Link to="/signup" className="btn-signup ">Sign up !</Link>
                                <p>Sponsored by Engineering Inc. at Texas A&M University</p>
                            </li>
                            <li className="flex-spread">
                                <p>Post your idea with the roles you need to bring it to life</p>
                                <img src={ideaLogo} alt="idea" />
                            </li>
                        </ul>
                    </section>}

                <div className="startup-cards">
                    {profilesData ? profilesData.map(startup => <StartupCard profileData={startup} key={startup._id} />) : null}
                </div>
            </div >
        );
    }
}



// ${hasToken && isTokenValid ? null : 'relative-padding'}
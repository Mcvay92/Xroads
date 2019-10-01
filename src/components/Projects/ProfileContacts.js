import React, { Component } from 'react';

import facebookLogo from '../../assets/images/facebook.svg';
import linkedinLogo from '../../assets/images/linkedin.svg';
import twitterLogo from '../../assets/images/twitter.svg';
import githubLogo from '../../assets/images/github.svg';
import phoneLogo from '../../assets/images/phone.svg';
import mailLogo from '../../assets/images/mail.svg';
import instagramLogo from '../../assets/images/instagram.svg';
import Avatar from '@material-ui/core/Avatar';

const socialMediaIcons = [githubLogo, facebookLogo, linkedinLogo, instagramLogo, phoneLogo, mailLogo];
const socialMediaDimensions = { height: '30px', width: '30px', cursor: 'pointer' };

export default class ProfileContacts extends Component {

    render() {
        const {
            git,
            facebook,
            linkedin,
            instagram,
            contact,
            inbox,
        } = this.props.contacts;
        const links = [git, facebook, linkedin, instagram];
        return (
            <ul className="social-media-list">
                {links.map((link, index) => <li className="social-media-item" key={link}>
                    <a href={`https://${link}`} target='_blank'>
                        <Avatar src={socialMediaIcons[index]} style={socialMediaDimensions} />
                    </a>
                </li>)}
                <li className="social-media-item" onClick={() => this.props.openModal(inbox, contact)}>
                    <Avatar src={phoneLogo} style={socialMediaDimensions} />
                </li>
                <li className="social-media-item" >
                    <a href={`mailto:${inbox}`} target='_blank'>
                        <Avatar src={mailLogo} style={socialMediaDimensions} />
                    </a>
                </li>
            </ul>
        )
    }


}
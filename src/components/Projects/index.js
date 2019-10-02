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
import HorizontalNonLinearStepper from './HorizontalNonLinearStepper';
import MaterialCard from './MaterialCard';
import facebookLogo from '../../assets/images/facebook.svg';
import linkedinLogo from '../../assets/images/linkedin.svg';
import githubLogo from '../../assets/images/github.svg';
import phoneLogo from '../../assets/images/phone.svg';
import mailLogo from '../../assets/images/mail.svg';
import addUser from '../../assets/images/add-user.svg';
import userLogo from '../../assets/images/user.svg';
import roleLogo from '../../assets/images/hand-shake.svg';
import addImage from '../../assets/images/add.svg';
import linkedinLogoSquare from '../../assets/images/linkedin-logo-square.svg';
import defaultStartupLogo from '../../assets/images/startup.svg';
import ProfileContacts from './ProfileContacts';

Modal.setAppElement('#root');

const socialMediaIcons = [githubLogo, facebookLogo, linkedinLogo, phoneLogo, mailLogo];

const avatarDimensions = { height: '190px', width: '190px' };
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
		this.state = {
			activeMemberIndex: 0,
			activeRoleIndex: 0,
			modalIsOpen: false,
			profileData: null,
			isLoading: true,
		};
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.logoUploader = React.createRef();
	}

	componentDidMount() {
		const { id } = this.props.match.params;
		userService
			.getProfile(id)
			.then((response) => {
				if (response.token == 'invalid') {
					this.props.history.push('/signin');
				} else {
					this.setState({
						profileData: response.data,
						isLoading: false,
					});
				}
			})
			.catch((error) => {
				this.setState({ error, isLoading: false });
			});
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

	openModal(MailTo, NumTo) {
		this.setState({ roleMail: MailTo, roleNum: NumTo }, () => {
			this.setState({ modalIsOpen: true });
		});
	}

	closeModal() {
		this.setState({ modalIsOpen: false });
	}

	updatePhoto(logo) {
		const data = this.state.profileData;
		const userData = JSON.parse(localStorage.getItem('user'));
		data.user_id = userData._id;
		const imagedata = document.querySelector('input[type="file"]').files[0];
		data.logo = imagedata;
		const form = new FormData();
		form.append('team_name', data.team_name);
		form.append('user_id', data.user_id);
		form.append('description', data.description);
		form.append('stage', data.stage);
		form.append('start_date', data.start_date);
		form.append('contact', data.contact);
		if (data && logo) {
			form.append('logo', logo);
		}
		form.append('members', JSON.stringify(data.members));
		form.append('roles', JSON.stringify(data.roles));

		userService
			.editProfile(form, data._id)
			.then(() => document.location.reload())
			.catch(err => console.error(err));
	}

	render() {
		if (this.state.isLoading) {
			return <div />;
		}
		const {
			description,
			team_name,
			stage,
			members,
			roles,
			logo,
			contact_phone,
			facebook,
			github,
			email,
			instagram,
			linkedin,
		} = this.state.profileData;

		return (
			<div className="col-sm-12 col-lg-8 col-md-10 margin-auto float-none">
				<Grid container justify="center" alignItems="center" direction="column">
					<Avatar
						alt="team logo"
						src={logo ? `https://crossroad-test.s3.us-east-2.amazonaws.com/logo/${logo}` : defaultStartupLogo}
						style={avatarDimensions}
						onClick={(e) => {
							if (!logo) {
								this.logoUploader.current.click();
							}
						}}
					/>
					<br />
					<input
						type="file"
						id="file"
						ref={this.logoUploader}
						style={{ display: 'none' }}
						onChange={(event) => {
							const newLogo = event.target.files[0];
							this.updatePhoto(newLogo);
						}}
					/>
					<Typography gutterBottom variant="headline" component="h2">
						{team_name}
					</Typography>
					<ReadMoreAndLess
						ref={this.ReadMore}
						className="read-more-content"
						charLimit={250}
						readMoreText="Read more"
						readLessText=""
					>
						{description}
					</ReadMoreAndLess>
					<ProfileContacts contacts={{
						contact_phone,
						facebook,
						github,
						email,
						instagram,
						linkedin
					}}
						openModal={this.openModal}
					/>
					<HorizontalNonLinearStepper currentStage={stage} profileData={this.state.profileData} />

					{members.length >= this.getCardsNum(0) ? (
						<div className="carousel">
							<Typography gutterBottom variant="headline" component="h3">
								members Available
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
								{Array.from(new Array(members.length + 1)).map((_, i) => (
									<MaterialCard>
										<div
											className="card-image"
											style={{
												background: members[i] ? `url(${userLogo})` : `url(${addUser})`,
											}}
										/>
										<Typography gutterBottom variant="body1" component="p">
											{members[i] ? members[i].name : 'Add Member'}
										</Typography>
										{members[i] ? (
											<Typography gutterBottom variant="body1" component="p">
												{members[i].major}
											</Typography>
										) : null}
										{members[i] ? (
											<Typography gutterBottom variant="body1" component="p">
												{members[i].role}
											</Typography>
										) : null}

										{members[i] ? (
											<a
												href={members[i].linkedin}
												target="_blank"
												rel="noopener noreferrer"
												style={{ position: 'absolute', right: 0, bottom: 0 }}
											>
												<img src={linkedinLogoSquare} style={{ width: '28px', height: '28px' }} alt="user linkedin account" />
											</a>
										) : null}
									</MaterialCard>
								))}
							</ItemsCarousel>
						</div>
					) : (
							<div className="normal-cards-view">
								<Typography gutterBottom variant="headline" component="h3">
									Team Members
                          </Typography>
								<div>
									{Array.from(new Array(this.getCardsNum(0))).map((_, i) => (
										<MaterialCard CustomWidth={`${Math.round(100 / this.getCardsNum(0)) - 1.5}%`}>
											<div
												className="card-image"
												style={{
													background: members[i] ? `url(${userLogo})` : `url(${addUser})`,
												}}
											/>
											<Typography gutterBottom variant="body1" component="p">
												{members[i] ? members[i].name : 'Add Member'}
											</Typography>
											{members[i] ? (
												<Typography gutterBottom variant="body1" component="p">
													{members[i].major}
												</Typography>
											) : null}
											{members[i] ? (
												<Typography gutterBottom variant="body1" component="p">
													{members[i].role}
												</Typography>
											) : null}

											{members[i] ? (
												<a
													href={members[i].linkedin}
													target="_blank"
													rel="noopener noreferrer"
													style={{ position: 'absolute', right: 0, bottom: 0 }}
												>
													<img src={linkedinLogoSquare} style={{ width: '28px', height: '28px' }} alt="user linkedin account" />
												</a>
											) : null}
										</MaterialCard>
									))}
									{' '}
								</div>
								{' '}
							</div>
						)}

					{roles.length >= this.getCardsNum(0) ? (
						<div className="carousel">
							<Typography gutterBottom variant="headline" component="h3">
								Roles Available
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
								activeItemIndex={this.state.activeRoleIndex}
								requestToChangeActive={value => this.setState({ activeRoleIndex: value })}
								rightChevron={<p className="card-controller">{'>'}</p>}
								leftChevron={<p className="card-controller">{'<'}</p>}
							>
								{Array.from(new Array(roles.length + 1)).map((_, i) => (
									<MaterialCard openModal={this.openModal} ModalData={{ email, contact_phone }} clickable>
										<div
											className="card-image"
											style={{
												background: roles[i] ? `url(${roleLogo})` : `url(${addUser})`,
											}}
										/>
										<Typography gutterBottom variant="body1" component="p">
											{roles[i] ? roles[i].name : 'Add Role'}
										</Typography>

									</MaterialCard>
								))}
							</ItemsCarousel>
						</div>
					) : (
							<div className="normal-cards-view">
								<Typography gutterBottom variant="headline" component="h3">
									Roles Available
                          </Typography>
								<div>
									{Array.from(new Array(this.getCardsNum(0))).map((_, i) => (
										<MaterialCard openModal={this.openModal} ModalData={{ email, contact_phone }} clickable CustomWidth={`${Math.round(100 / this.getCardsNum(0)) - 1.5}%`}>
											<div
												className="card-image"
												style={{
													background: roles[i] ? `url(${roleLogo})` : `url(${addUser})`,
												}}
											/>
											<Typography gutterBottom variant="body1" component="p">
												{roles[i] ? roles[i].name : 'Add Role'}
											</Typography>

										</MaterialCard>
									))}
									{' '}
								</div>
								{' '}
							</div>
						)}
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
					<button type="button" onClick={this.closeModal} className="close-modal-button">
						close
                  </button>
				</Modal>
			</div>
		);
	}
}

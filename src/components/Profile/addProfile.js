import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Link } from 'react-router-dom';
import {
  Form,
  TextField,
  ObjectField,
  ErrorsContainer,
  ListField,
  DateField,
  SelectField,
  SubmitField,
} from 'react-components-form';
import { userService } from '../../services';
import { profileSchema } from './schemas';
import FileField from '../common/FileField';
import config from '../../config';

const addMemberButton = { className: 'button button-info', value: 'Add Memeber' };
const addRoleButton = { className: 'button button-info', value: 'Add Role' };
const removeMemberButton = { className: 'button button-info', value: 'Remove Memeber' };
const removeRoleButton = { className: 'button button-info', value: 'Remove Role' };
const errorClasses = {
  className: 'alert alert-danger',
  fieldClassName: 'has-error',
};
let removeImageData = false;
const ProfileForm = (props) => {
  const addMemberButton = { className: 'btn btn-info mt-30 mb-20', value: 'Add Memeber' };
  const removeMemberButton = { className: 'btn btn-info', value: 'Remove Memeber' };
  const addRoleButton = { className: 'btn btn-info mt-30 mb-20', value: 'Add Role' };
  const removeRoleButton = { className: 'btn btn-info', value: 'Remove Role' };
  const profileData = props.profiledata;
  console.log(profileData, 'profileData', typeof profileData);
  const stageOject = config.stageSelect;
  return (
      <div className="form-container">
          <TextField
              value={profileData ? profileData.team_name : null}
              name="team_name"
              errorStyles={errorClasses}
              className="form-control"
              label="Team Name"
              placeholder="Team Name"
              wrapperClassName="form-group"
          />
          <TextField
              value={profileData ? profileData.description : null}
              name="description"
              errorStyles={errorClasses}
              className="form-control"
              label="Description"
              placeholder="Description"
              wrapperClassName="form-group"
          />
          <TextField
              value={profileData ? profileData.contact_phone : null}
              name="contact_phone"
              errorStyles={errorClasses}
              className="form-control"
              label="Contact Phone"
              placeholder="Contact Phone"
              wrapperClassName="form-group"
          />
          <SelectField
              value={profileData ? profileData.stage : 0}
              name="stage"
              errorStyles={errorClasses}
              className="form-control"
              options={stageOject}
              label="Stage"
              wrapperClassName="form-group"
          />
          <DateField
              value={profileData ? new Date(profileData.start_date) : null}
              name="start_date"
              errorStyles={errorClasses}
              className="form-control"
              label="Start Date"
              wrapperClassName="form-group"
          />

          <div className="members-heading">
              <b>Optional Links:</b>
          </div>
          <TextField
              value={profileData ? profileData.linkedin : null}
              name="linkedin"
              errorStyles={errorClasses}
              className="form-control"
              label="LinkedIn"
              wrapperClassName="form-group"
          />
          <TextField
              value={profileData ? profileData.github : null}
              name="github"
              errorStyles={errorClasses}
              className="form-control"
              label="Github"
              wrapperClassName="form-group"
          />
          <TextField
              value={profileData ? profileData.facebook : null}
              name="facebook"
              errorStyles={errorClasses}
              className="form-control"
              label="Facebook"
              wrapperClassName="form-group"
          />
          <TextField
              value={profileData ? profileData.instagram : null}
              name="instagram"
              errorStyles={errorClasses}
              className="form-control"
              label="Instagram"
              wrapperClassName="form-group"
          />
          <br />
          <div className="members-heading">
              <b>Members:</b>
          </div>
          <ListField
              value={profileData ? profileData.members : null}
              name="members"
              addButton={addMemberButton}
              removeButton={removeMemberButton}
              wrapperClassName="member-wrapper"
              className="member-inner"
          >
              <ObjectField>
                  <TextField
                      name="name"
                      label="Member Name"
                      className="form-control"
                      wrapperClassName="form-group"
                  />
                  <TextField
                      name="major"
                      label="Major"
                      className="form-control"
                      wrapperClassName="form-group"
                  />
                  <TextField
                      name="linkedin"
                      label="LinkedIn URL"
                      className="form-control"
                      wrapperClassName="form-group"
                  />
                  <TextField
                      value={profileData ? profileData.role : null}
                      name="role"
                      errorStyles={errorClasses}
                      className="form-control"
                      label="Member Role"
                      placeholder="Member Role"
                      wrapperClassName="form-group"
                  />
              </ObjectField>
          </ListField>

          <div className="members-heading">
              <b>Available Roles:</b>
          </div>
          <ListField
              value={profileData ? profileData.roles : null}
              name="roles"
              addButton={addRoleButton}
              removeButton={removeRoleButton}
              wrapperClassName="member-wrapper"
              className="member-inner"
          >
              <ObjectField>
                  <TextField
                      name="name"
                      label="Role Name"
                      className="form-control"
                      wrapperClassName="form-group"
                  />
              </ObjectField>
          </ListField>

          {profileData && profileData.logo && (
          <div className="form-group">
              <FileField
                  name="logo"
                  id="imageupload"
                  className="form-control"
                  label="Logo"
                  wrapperClassName="img-outer"
                  imgSrc={config.LOGO_IMG_PATH + profileData.logo}
              />
              <span id="remove-image" className="btn btn-close close" onClick={removeImage}>
            X
              </span>
          </div>
          )}
          {(profileData == null || (profileData && !profileData.logo)) && (
          <FileField
              name="logo"
              id="imageupload"
              className="form-control"
              label="Logo"
              wrapperClassName="form-group"
          />
          )}
      </div>
  );
};
const removeImage = () => {
  console.log('removeImage');
  const imgLayer = document.getElementsByClassName('img-layer');
  const imgOuter = document.getElementsByClassName('img-outer');
  document.getElementById('remove-image').remove();
  imgLayer[0].remove();
  imgOuter[0].classList.remove('img-outer');
  removeImageData = true;
};
class AddProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      loading: false,
      profileId: false,
      profileData: null,
      fileUploaded: false,
      isOpen: localStorage.getItem('token_valid') !== 'true',
      isDialog: typeof localStorage.getItem('access_token') === 'string',
      errorMsg: null,
      successMsg: null,
    };
    this.submitProfile = this.submitProfile.bind(this);
    this.getProfilesData = this.getProfilesData.bind(this);
    this.tokenHandler = this.tokenHandler.bind(this);
    this.updateProfilesData = this.updateProfilesData.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ isOpen: false });
    this.context.router.history.push('/signin');
  }

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.value });
  };

  tokenHandler(response) {
    if (response && response.token == 'invalid') {
      this.setState({
        isDialog: false,
        isOpen: true,
      });
    } else {
      this.setState({
        isDialog: true,
        isOpen: false,
      });
    }
  }

  getProfilesData(profileId) {
    userService.getProfile(profileId).then(
      (response) => {
        this.tokenHandler(response);
        this.setState({ profileData: response.data, loading: false });
      },
      error => this.setState({ error, loading: false }),
    );
  }

  updateProfilesData(formData, profileId) {
    userService.editProfile(formData, profileId).then(
      (response) => {
        this.tokenHandler(response);
        if (response.status == true) {
          this.setState({ successMsg: 'Profile updated successfully.', loading: false });
          setTimeout(() => {
            this.context.router.history.push('/profile');
          }, 1000);
        } else {
          this.setState({ erroMsg: response.error });
        }
      },
      error => this.setState({ error, loading: false }),
    );
  }

  addProfilesData(formData) {
    userService.addProfile(formData).then(
      (response) => {
        this.tokenHandler(response);
        if (response.status == true) {
          this.setState({ successMsg: 'Profile added successfully.', loading: false });
          setTimeout(() => {
            this.context.router.history.push('/profile');
          }, 1000);
        } else {
          let erroMsg = null;
          const { errors } = response.error;
          Object.keys(errors).map((k) => {
            erroMsg = errors[k].message;
          });
          this.setState({ errorMsg: erroMsg });
        }
      },
      error => this.setState({ error, loading: false }),
    );
  }

  componentWillMount() {
    const {
      match: { params },
    } = this.props;
    if (params.id !== undefined) {
      this.getProfilesData(params.id);
      this.setState({ profileId: params.id });
    }
  }

  submitProfile(data) {
    const userData = JSON.parse(localStorage.getItem('user'));
    data.user_id = userData._id;
    const imagedata = document.querySelector('input[type="file"]').files[0];
    data.logo = imagedata;
    data = data;
    this.setState({ loading: true, successMsg: null, errorMsg: null });
    console.log(removeImageData, 'removeImageData', data.logo);
    const form = new FormData();
    form.append('team_name', data.team_name);
    form.append('user_id', data.user_id);
    form.append('description', data.description);
    form.append('stage', data.stage);
    form.append('start_date', data.start_date);
    form.append('contact', data.contact);
    if (data && data.logo) {
      form.append('logo', data.logo);
    }
    if (data && data.logo == undefined && removeImageData) {
      form.append('removeLogo', removeImageData);
    }
    form.append('members', JSON.stringify(data.members));
    form.append('roles', JSON.stringify(data.roles));
    if (this.state.profileId) {
      this.updateProfilesData(form, this.state.profileId);
    } else {
      this.addProfilesData(form);
    }
  }

  render() {
    const { errorMsg, successMsg } = this.state;
    return (
        <div className="col-sm-6 margin-auto float-none">
            <Typography gutterBottom variant="headline" component="h1">
                {this.state.profileId ? 'Edit' : 'Add'}
                {' '}
Profile
            </Typography>
            <Form
                schema={profileSchema}
                encType="multipart/form-data"
                onSubmit={data => this.submitProfile(data)}
                className="custom-form"
                onError={errors => console.log('error', errors)}
            >
                {this.state.profileData && <ProfileForm profiledata={this.state.profileData} />}
                {!this.state.profileData && <ProfileForm profiledata={null} />}
                {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
                {successMsg && <div className="alert alert-success">{successMsg}</div>}
                <div className="mt-50">
                    <SubmitField
                        className="btn btn-success"
                        value={this.state.profileData ? 'Update' : 'Save'}
                    />
                </div>
            </Form>
            {(this.state.isDialog == false || this.state.isOpen == true) && (
            <Dialog
                open={this.state.isOpen}
                onClose={this.handleClose}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogContent>
                    <DialogContentText>
                Your session is expired. Please login to continue.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                Ok
                    </Button>
                </DialogActions>
            </Dialog>
            )}
        </div>
    );
  }
}
AddProfile.contextTypes = {
  router: PropTypes.object.isRequired,
};
export default AddProfile;

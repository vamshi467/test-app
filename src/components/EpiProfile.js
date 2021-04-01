import React, { useState } from 'react';
import PropType from 'prop-types';
import './EpiProfile';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {FetchProfileData,UpdateProfileData} from '../services/ProfileServiceFactory';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ProfileContext = React.createContext();

const EpiProfile = (props) => {
    const {
        profiles,        
    } = props
 const [open,setOpen] = useState(false);
 const [selectedProfile,setSelectedProfile] = useState(false);
 const handleEditClick = (data) => {
      setOpen(true);
      setSelectedProfile(data);
     }

     const handleDeleteClick = (id) => {
         alert('Clicked Delete link');
     }

     const handleClose = () => {
            setOpen(false);
            const GetProfiles = FetchProfileData();
            GetProfiles()
            .then(res => 
              {
                const result = res;
               // setProfiles(result);
              })
              .catch(console.error());
      };

      const handleSaveProfile = (selectedProfile) => 
      {
        console.log('Selected Date :' + JSON.stringify(selectedProfile));
      //  e.preventDefault();
        const params = 
        {
          firstName: selectedProfile.nmFirst,
          lastName: selectedProfile.nmLast,
          gender: selectedProfile.cdGender,
          ID: selectedProfile.idProfile
        };
        const UpdateProfile = UpdateProfileData();
        UpdateProfile(params)
        .then(res =>
         {
           const result = res;
           console.log('Updated Result :' + result);
         }).catch(console.error());
      }
    
     const renderRow = (data) => 
     {
      const {
        key,
        idProfile,nmLast,nmFirst,cdGender} = data;
         return (
         <tr key = {idProfile}>
            <td>{idProfile}</td>
            <td>{nmLast}</td>
            <td>{nmFirst}</td>
            <td>{cdGender}</td>
            <td>      
                <Link href="#" key = {key} variant="body2" 
                 onClick = {() => handleEditClick(data)} 
                >Edit
                </Link>
            </td> 
            <td>      
                <Link href="#" variant="body2" onClick= {()=> handleDeleteClick(idProfile)}>
                        Delete
                </Link>
            </td>
      </tr>
      );
     };

     const renderHeader = () => {
        let headerElement = ['ID', 'LastName', 'FirstName', 'Gender']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

return (
 <div className="merlin-grid">
      <div class=" table-responsive shadowed">
    <ProfileContext.Provider value = {profiles}>
      <table class="table table-bordered table-bordered-inside-only table-striped table-condensed table-hover">
              <thead>
                  <tr>
                      {renderHeader()}
                  </tr>
              </thead>
                    <tbody>
        {profiles && profiles.map((data, key) => {
            console.log('Data : '+data);
          return (
                  renderRow(data) 
                 );
          })}
        </tbody>
    </table>
    </ProfileContext.Provider>
    <form onSubmit = {submitProfileData}>
            <Dialog open = {open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
              <DialogContent>
                {/* <DialogContentText>
                  To subscribe to this website, please enter your email address here. We will send updates
                  occasionally.
                </DialogContentText> */}
          <TextField name="firstName" key="firstName" defaultValue={selectedProfile.nmFirst}
               //onChange={(e) => { setFirstName(e.target.value)} } 
              id="outlined-basic" label="First Name" variant="outlined"  />
          <br/>
          <br></br>
          <TextField name="lastName" key="lastName" defaultValue = {selectedProfile.nmLast}
              //onChange={(e) => { setLastName(e.target.value) }} 
              id="outlined-basic" label="Last Name" variant="outlined"  />
          <br></br>
          <br></br>
          <TextField name="gender" key="gender" defaultValue = {selectedProfile.cdGender}
               // onChange={(e) => { setGender(e.target.value) }} 
                id="outlined-basic" label="Gender" variant="outlined"  />
                <br></br>
                <br></br>
          </DialogContent>
              <DialogActions>
              <Button onClick={() => handleSaveProfile(selectedProfile)} color="primary">
                  Save
                </Button>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </form>
        </div>
    </div>
    );
    };

  export default EpiProfile
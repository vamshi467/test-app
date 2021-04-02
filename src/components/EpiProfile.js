import React, { useState } from 'react';
import PropType from 'prop-types';
import './EpiProfile';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {DeleteProfileData, FetchProfileData,UpdateProfileData} from '../services/ProfileServiceFactory';

import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const ProfileContext = React.createContext();

const EpiProfile = (props) => {
    const {
        profiles, 
        funcUpdate       
    } = props

 const [open,setOpen] = useState(false);
 const [selectedProfile,setSelectedProfile] = useState(false);
 const [firstName,setFirstName] = useState(selectedProfile.firstName);
 const [lastName,setLastName] = useState(selectedProfile.lastName);
 const [gender,setGender] = useState(selectedProfile.gender);
 const [idProfile,setIdProfile] = useState(selectedProfile.idProfile);

 const handleEditClick = (data) => {
      setOpen(true);
      setSelectedProfile(data);
      setFirstName(data.nmFirst);
      setLastName(data.nmLast);
      setGender(data.cdGender);
      setIdProfile(data.idProfile);
      console.log('FirstName :' + data.nmFirst);
      console.log('Gender :' + data.gender);
     }

     const handleDeleteClick = (id) => {
         const deleteProfile = DeleteProfileData();
         deleteProfile(id)
         .then(res =>
          {
            alert('Deleted record successfully');
            funcUpdate()
          }).catch(console.error())
     }

     const useStyles = makeStyles({
      table: {
        minWidth: 200,
        maxWidth: 300
      },
    });

     const handleClose = () => {
            setOpen(false);
            console.log('Length of Profile :' + profiles.length);
            const GetProfiles = FetchProfileData();
            GetProfiles()
            .then(res => 
              {
                funcUpdate()
              })
              .catch(console.error());
      };

      const handleSaveProfile = () => 
      {
        const params = 
        {
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          ID: idProfile
        };
        const UpdateProfile = UpdateProfileData();
        UpdateProfile(params)
        .then(res =>
         {
           const result = res;
            alert('Profile updated successfully');
            console.log('Result :'+result);
         }).catch(console.error());
      }
    
     const renderRow = (data) => 
     {
      const {
        key,
        idProfile,nmLast,nmFirst,cdGender} = data;
         return (
         <TableRow key = {key}>
            <TableCell align="center">{idProfile}</TableCell>
            <TableCell align="center">{nmLast}</TableCell>
            <TableCell align="center">{nmFirst}</TableCell>
            <TableCell align="center">{cdGender}</TableCell>
            <TableCell align="center">      
                <Link href="#" key = {key} variant="body2" 
                 onClick = {() => handleEditClick(data)} 
                >Edit
                </Link>
            </TableCell> 
            <TableCell align="center">      
                <Link href="#" variant="body2" onClick= {()=> handleDeleteClick(idProfile)}>
                        Delete
                </Link>
            </TableCell>
      </TableRow>
      );
     };

     const renderHeader = () => {
        let headerElement = ['ID', 'LastName', 'FirstName', 'Gender','Edit Action','Delete Action']

        return headerElement.map((key, index) => {
            return <TableCell key={index} align="center">{key.toUpperCase()}</TableCell>
        })
    }
    const styles = {
      visibility: profiles.length > 0 ? 'visible' : 'hidden'
    }
    const classes = useStyles();

return (
 <div style = {styles}>
      <div>
    <ProfileContext.Provider value = {profiles}>
      <TableContainer  component={Paper} >
      <Table className={classes.table} aria-label="simple table" align="center">
              <TableHead>
                  <TableRow>
                      {renderHeader()}
                  </TableRow>
              </TableHead>
              <TableBody>
                      {profiles && profiles.map((data) => {
                        return (
                                renderRow(data) 
                              );
                        })}
               </TableBody>
    </Table>
    </TableContainer>
    </ProfileContext.Provider>
    <form>
            <Dialog open = {open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
              <DialogContent>
          <TextField name="firstName" key="firstName" defaultValue={selectedProfile.nmFirst}
               onChange={(e) => { setFirstName(e.target.value)} } 
              id="firstName" label="First Name" variant="outlined"  />
          <br/>
          <br></br>
          <TextField name="lastName" key="lastName" defaultValue = {selectedProfile.nmLast}
              onChange={(e) => { setLastName(e.target.value) }} 
              id="lastName" label="Last Name" variant="outlined"  />
          <br></br>
          <br></br>
          <TextField name="gender" key="gender" defaultValue = {selectedProfile.cdGender}
                onChange={(e) => { setGender(e.target.value) }} 
                id="gender" label="Gender" variant="outlined"  />
                <br></br>
                <br></br>
          </DialogContent>
              <DialogActions>
              <Button onClick={() => handleSaveProfile()} color="primary">
                  Save
                </Button>
                <Button onClick={() => handleClose()} color="primary">
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
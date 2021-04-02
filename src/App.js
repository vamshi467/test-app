import React  ,  { useState }from 'react';
//material-ui Imports
import { Button, TextField } from '@material-ui/core';
// import { spacing } from '@material-ui/system';
import { makeStyles, withStyles } from '@material-ui/core/styles';
// Local Imports
import logo from './logo.svg';
import './App.css';
import FetchUsereData from '../src/services/UsersServiceFactory';
import {FetchProfileData,UpdateProfileData} from '../src/services/ProfileServiceFactory';
import EpiProfile from './components/EpiProfile'
import Person from './components/Person'
import Product from './components/Product'
import ColorButton from './components/ColorButton'
import HomePageHeader from './components/Header';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const useStylesGrid = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function App() {

  const classes = useStyles();
  const stylesGrid = useStylesGrid();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender,setGender] = useState('');
  const [person, setPerson] = useState([]);
  const [products, setProducts] = useState([]);
  const [profiles, setProfiles] = useState([]);



  const handleEditing = (e) => {
    e.preventDefault();
    let host = 'http://localhost';
    let port = '44333';
    const headers = {
        'Content-Type': 'application/json'
    };
    //fetchProductsData();
    const GetUsers = FetchUsereData();
    GetUsers()
    .then(res =>
      {
        const result = res;
        setPerson(result);
        console.log(JSON.stringify(result));
      })
      .catch(console.error());
  }

  const handleProfile = () => {
    //fetchProfileData();
    const GetProfiles = FetchProfileData();
    GetProfiles()
    .then(res => 
      {
        const result = res;
        setProfiles(result);
       // console.log(JSON.stringify(result));
      })
      .catch(console.error());
  }


  const handleUpdateProfile = (e) => 
  {
   e.preventDefault();
   const params = 
   {
     firstName: firstName,
     lastName: lastName,
     gender: gender,
     ID: 188043
   };
   //console.log('Input Params'+ JSON.stringify(params));
   const UpdateProfile = UpdateProfileData();
   console.log('Method :' + UpdateProfile());
   UpdateProfile(params)
   .then(res =>
    {
      const result = res;
      console.log('Updated Result :' + result);
      const GetProfiles = FetchProfileData();
        GetProfiles()
        .then(res => 
          {
            const result = res;
            setProfiles(result);
          })
          .catch(console.error());
        })
  }

  return (
    
    <div className="App">
      <HomePageHeader/>
      {/* <header className="App-header"> */}
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      {/* </header> */}
      {/* <ColorButton onClick={handleEditing} type="submit">
          Get Products
      </ColorButton> <span></span> */}
      <ColorButton onClick={handleProfile} type="submit">
          Get Profiles
      </ColorButton> <span width="20"></span>
      {/* <ColorButton onClick={handleUpdateProfile} type="submit">
          Update Profiles
      </ColorButton> */}
      {/* <div className="stock-container">
        {person && person.map((data, key) => {
          return (
            <div key={key}>
              <Person
                key={key}
                name={data.name}
                username={data.username}
                email={data.email}
              />
            </div>
          );
        })}
      </div> */}
      <Product products = {products} />
      <Person person = {person} />
      <EpiProfile profiles={profiles} funcUpdate = {handleProfile}/>
    </div>
  );
};


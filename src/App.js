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


export default function App() {
  const [person, setPerson] = useState([]);
  const [products, setProducts] = useState([]);
  const [profiles, setProfiles] = useState([]);

  const handleProfile = () => {
    const GetProfiles = FetchProfileData();
    GetProfiles()
    .then(res => 
      {
        const result = res;
        setProfiles(result);
      })
      .catch(console.error());
  }

  return (
    
    <div className="App">
      <HomePageHeader/>
      <ColorButton onClick={handleProfile} type="submit">
          Get Profiles
      </ColorButton> <span width="20"></span>
      <Product products = {products} />
      <Person person = {person} />
      <EpiProfile profiles={profiles} funcUpdate = {handleProfile}/>
    </div>
  );
};


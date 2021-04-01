import React  ,  { useState }from 'react';
//material-ui Imports
import { Button, TextField } from '@material-ui/core';
// import { spacing } from '@material-ui/system';
import { makeStyles, withStyles } from '@material-ui/core/styles';
// Local Imports
import logo from './logo.svg';
import './App.css';
import FetchProductData from './services/ProductsServiceFactory';
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


  const submit = (e) => {
    // let user = {
    //   "name1" : name1,
    //   "name2" : name2
    // } 
    e.preventDefault();
    let host = 'http://localhost';
    let port = '44333';
    const headers = {
        'Content-Type': 'application/json'
    };
  // fetchData();
  const GetProducts = FetchProductData();
    GetProducts().then(data =>
      {
        setProducts(data);
        console.log(JSON.stringify(data));
      }
      )
      .catch(console.error());
  }

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

  const handleProfile = (e) => {
    e.preventDefault();
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

  // function fetchData() {
  //   try {
  //     axios.get(`https://jsonplaceholder.typicode.com/users`)
  //     .then(res => {
  //       const persons = res.data;
  //       setPerson(persons);
  //       console.log('Test persons : ' + JSON.stringify(persons));
  //     })
  //   }    
  //   catch(error)
  //   {
  //      console.log(error);
  //   }
  // }

  // function fetchProductsData() 
  // {
  //    try 
  //    {
  //       axios.get('https://localhost:44333/api/products')
  //       .then(res => 
  //         {
  //           const products = res.data;
  //           setProducts(products);
  //           console.log('Products' + JSON.stringify(products));
  //         } )
  //    }
  //    catch(error)
  //    {
  //      console.log(error);
  //    }
  // }

  // function fetchProfileData()
  // {
  //   try 
  //   {
  //     axios.get('https://localhost:44333/api/profiles')
  //     .then( res => 
  //       {
  //         const profiles = res.data;
  //         setProfiles(profiles);
  //         console.log('Profiles : ' + JSON.stringify(profiles));
  //       }
  //     )
  //   }
  //   catch(error) 
  //   {
  //     console.log(error);
  //   }
  // }

  // const Person = ({ name , username, email}) => {
  //   return (
  //     <table>
  //       <tbody>
  //         <tr>
  //           <td>
  //             <h5>{name}</h5>
  //           </td>
  //           <td>
  //             <h5>{username}</h5>
  //           </td>
  //           <td>
  //             <h4>{email}</h4>
  //           </td>
  //         </tr>
  //       </tbody>
  //     </table>
  //   );
  // };

  return (
    
    <div className="App">
      <HomePageHeader/>
      {/* <header className="App-header"> */}
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <form className={classes.root} noValidate autoComplete="off" onSubmit={submit} >
          {/* <label>First Name</label>
          <TextField name="firstName" key="firstName" onChange={(e) => { setFirstName(e.target.value)} } id="standard-basic" label="First Name" variant="filled" className={classes.margin} />
          <br/>
          <label>Last Name</label>
          <TextField name="lastName" key="lastName" onChange={(e) => { setLastName(e.target.value) }} id="filled-basic" label="Last Name" variant="filled" className={classes.margin} />
          <br></br>
          <label>Gender</label>
          <TextField name="gender" key="gender" onChange={(e) => { setGender(e.target.value) }} id="filled-basic" label="Gender" variant="filled" className={classes.margin} />
          <br></br> */}
          {/* <ColorButton
            type="submit"
            variant="contained"
            color="primary"
            className={classes.margin}
            size="large"
          >Get Users
          </ColorButton> */}
        </form>
      {/* </header> */}
      {/* <ColorButton onClick={handleEditing} type="submit">
          Get Products
      </ColorButton> <span></span> */}
      <ColorButton onClick={handleProfile} type="submit">
          Get Profiles
      </ColorButton> <span></span>
      <ColorButton onClick={handleUpdateProfile} type="submit">
          Update Profiles
      </ColorButton>
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
      <EpiProfile profiles={profiles} />
    </div>
  );
};


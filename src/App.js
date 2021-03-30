import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
// import { spacing } from '@material-ui/system';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import React from 'react';
import FetchProductData from './services/ProductsServiceFactory';
import FetchUsereData from '../src/services/UsersServiceFactory';
import FetchProfileData from '../src/services/ProfileServiceFactory';
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  },
}))(Button);

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
  const [name1, setName1] = useState('default');
  const [name2, setName2] = useState('default');
  const [person, setPerson] = useState([]);
  const [products, setProducts] = useState([]);
  const [profiles, setProfiles] = useState([]);


  const submit = (e) => {
    let user = {
      "name1" : name1,
      "name2" : name2
    } 
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
    console.log(GetProfiles);
    GetProfiles()
    .then(res => 
      {
        const result = res;
        setProfiles(result);
        console.log(JSON.stringify(result));
      })
      .catch(console.error());
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

  const Person = ({ name , username, email}) => {
    return (
      <table>
        <tbody>
          <tr>
            <td>
              <h5>{name}</h5>
            </td>
            <td>
              <h5>{username}</h5>
            </td>
            <td>
              <h4>{email}</h4>
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  const Product = ({name , brand}) => {
   return (
    <table>
    <tbody>
      <tr>
        <td>
          <h5>{name}</h5>
        </td>
        <td>
          <h5>{brand}</h5>
        </td>
      </tr>
    </tbody>
  </table>
   );

  };

  const EpiProfile = ({nmLast,nmFirst,cdGender}) => {
    return (
      <table>
      <tbody>
        <tr>
          <td>
          <th>Last Name</th>
            <h5>{nmLast}</h5>
          </td>
          <td>
          <th>First Name</th>
            <h5>{nmFirst}</h5>
          </td>
          <td>
          <th>Gender</th>
            <h5>{cdGender}</h5>
          </td>
        </tr>
      </tbody>
    </table>
     );

  };

  return (
    <div className="App">
      {/* <header className="App-header"> */}
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <form className={classes.root} noValidate autoComplete="off" onSubmit={submit} >
          <TextField name="name1" key="name1" onChange={(e) => { setName1(e.target.value)} } id="standard-basic" label="Standard" variant="filled" className={classes.margin} />
          <br/>
          <TextField name="name2" key="name2" onChange={(e) => { setName2(e.target.value) }} id="filled-basic" label="Filled" variant="filled" className={classes.margin} />
          <br></br>
          <ColorButton
            type="submit"
            variant="contained"
            color="primary"
            className={classes.margin}
            size="large"
          >Get Users
          </ColorButton>
        </form>
      {/* </header> */}
      <ColorButton onClick={handleEditing} type="submit">
          Get Products
      </ColorButton> <span></span>
      <ColorButton onClick={handleProfile} type="submit">
          Get Profiles
      </ColorButton>
      <div className="stock-container">
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
      </div>

      <div className="stock-container">
        { products && products.map((data, key) => {
          return (
            <div key={key}>
              <Product
                key={key}
                name={data.name}
                brand={data.brand}
              />
            </div>
          );
        })}
      </div>

      <div className="stock-container">
        {profiles && profiles.map((data, key) => {
          return (
            <div key={key}>
              <EpiProfile
                key={key}
                nmFirst = {data.nmFirst}
                nmLast = {data.nmLast}
                cdGender = {data.cdGender}
              />
            </div>
          );
        })}
      </div>
      {/* <ul>
        {person.map(p => <li key={p.id} >{p.name}</li>)} 
      </ul>  */}
    </div>
  );
};


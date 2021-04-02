import axios from 'axios'
const FetchProfileData = () => async() => 
{
   try 
   {
        const result = await axios.get('https://localhost:44333/api/profiles');
        console.log('Profiles : ' + JSON.stringify(result));
        return result.data;
   }
   catch(error)
   {
       console.log(error);
       throw error.data && error.response.data;
   }

} 

const UpdateProfileData = () => async(params) =>
{
  try 
  {
    console.log('Params :'+  JSON.stringify(params));
    console.log('Params ID' + JSON.stringify(params.ID));
    const result = await axios.put(`https://localhost:44333/api/profiles/${params.ID}`,params);
    return result.data;
  }
  catch(error)
  {
    console.log(error);
    throw error.data && error.response.data;
  }

}

const DeleteProfileData = () => async(ID) =>
{
  try 
  {
    console.log('Params ID' + ID);
    const result = await axios.delete(`https://localhost:44333/api/profiles/${ID}`);
    return result.data;
  }
  catch(error)
  {
    console.log(error);
    throw error.data && error.response.data;
  }

}

export{ FetchProfileData,
        UpdateProfileData,
        DeleteProfileData}




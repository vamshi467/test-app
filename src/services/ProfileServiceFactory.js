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
export default FetchProfileData


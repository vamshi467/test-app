import axios from 'axios'
const FetchUsereData = () => async() => 
{
   try 
   {
       const result = await axios.get('https://jsonplaceholder.typicode.com/users');
       console.log('Users : ' + JSON.stringify(result));
      return result.data;
   }
   catch(error)
   {
       console.log(error);
       throw error.data && error.response.data;
   }

} 
export default FetchUsereData

import axios from 'axios';
const FetchProductData = () => async() =>
        {
            try 
            {
              const result = await axios.get('https://localhost:44333/api/products')
              console.log('Products' + JSON.stringify(result));
              return result.data;
            }
            catch(error)
            {
              console.log(error);
            }
    }
export default FetchProductData

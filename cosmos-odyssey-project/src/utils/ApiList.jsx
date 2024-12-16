import axios from 'axios';

//const API_URL = 'https://cors-anywhere.herokuapp.com/https://cosmos-odyssey.azurewebsites.net/api/v1.0/TravelPrices';

const API_URL = 'http://localhost:3001/legs'

const fetchData = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log('API response:', response.data);
    return { legs: response.data };
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export default fetchData;
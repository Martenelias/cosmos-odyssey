import axios from 'axios';

const API_URL = 'https://cors-anywhere.herokuapp.com/https://cosmosodyssey.azurewebsites.net/api/v1.0/TravelPrices';

const fetchData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export default fetchData;
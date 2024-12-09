import axios from 'axios';
import { useEffect } from 'react';

const API_URL = 'https://cors-anywhere.herokuapp.com/https://cosmos-odyssey.azurewebsites.net/api/v1.0/TravelPrices';


const Content = () => {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        console.log('API response:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
};

export default Content;
import axios from 'axios';

const API_URL = 'https://cosmos-proxy-server.onrender.com/';

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
import axios from 'axios';

const enginesApi = {
  all() {
    return axios.get('https://ubisense-takehome-api.netlify.app/.netlify/functions/engines');
  }
}

export {
  enginesApi
}
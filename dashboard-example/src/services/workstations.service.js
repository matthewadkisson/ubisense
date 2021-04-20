import axios from 'axios';

const workstationsApi = {
  all() {
    return axios.get('https://ubisense-takehome-api.netlify.app/.netlify/functions/workstations');
  }
}

export {
  workstationsApi
}
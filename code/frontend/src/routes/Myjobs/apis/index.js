import axios from 'axios';

const apiGetJobList = () => {
  return axios.get('http://api.gleaming-idiom-167311.appspot.com/api/v1/jobs/')
}

export default {
	apiGetJobList
}
import axios from 'axios';

const getLongListProfiles = () => {
	return axios.get('https://dev1-dot-gleaming-idiom-167311.appspot.com/dev/stub?limit=10')
}

const apiGetJobList = () => {
  return axios.get('http://api.gleaming-idiom-167311.appspot.com/api/v1/jobs/')
}

export default {
	apiGetJobList,
	getLongListProfiles
}
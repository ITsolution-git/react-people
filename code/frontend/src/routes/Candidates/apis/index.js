import axios from 'axios';

const getLongListProfiles = (limit=10) => {
	return axios.get(`https://dev1-dot-gleaming-idiom-167311.appspot.com/dev/longlist?limit=${limit}`)
}

export default {
	getLongListProfiles
}
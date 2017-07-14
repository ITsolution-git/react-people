import axios from 'axios';

const getLongListProfiles = () => {
	return axios.get('https://dev1-dot-gleaming-idiom-167311.appspot.com/dev/stub')
}

export default {
	getLongListProfiles
}
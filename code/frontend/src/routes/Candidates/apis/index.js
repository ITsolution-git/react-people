import axios from 'axios';

const getLongListProfiles = (limit=10, country='*') => {
	if(country == '*')
		return axios.get(`https://dev1-dot-gleaming-idiom-167311.appspot.com/dev/longlist?limit=${limit}`)
	else
		return axios.get(`https://dev1-dot-gleaming-idiom-167311.appspot.com/dev/longlist?limit=${limit}&country=${country}`)
}

export default {
	getLongListProfiles
}
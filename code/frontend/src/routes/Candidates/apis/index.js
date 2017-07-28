import axios from 'axios';

const getLongListProfiles = (limit=10, country='*') => {
	// if(country == '*')
	// 		return axios.get(`https://dev1-dot-gleaming-idiom-167311.appspot.com/dev/longlist?limit=${limit}`)
	// 	else
	// 		return axios.get(`https://dev1-dot-gleaming-idiom-167311.appspot.com/dev/longlist?limit=${limit}&country=${country}`)

	let long_list = window.localStorage.getItem("JOB_LONG_LIST")
	if(long_list == undefined || long_list == "0"){
		if(country == '*')
			return axios.get(`https://dev1-dot-gleaming-idiom-167311.appspot.com/dev/longlist?limit=${limit}`)
		else
			return axios.get(`https://dev1-dot-gleaming-idiom-167311.appspot.com/dev/longlist?limit=${limit}&country=${country}`)
	} else if (long_list == "1") {
		let id = window.localStorage.getItem("JOB_LONG_LIST_ID")
		return axios.get(`http://api.gleaming-idiom-167311.appspot.com/api/v1/jobs/${id}/matches`, {
			      headers: {'Authorization': 'Bearer ' + getIdToken()}
			    })	
		
	}
}

const getProfileDetail = (id) => {
	return axios.get(`https://dev1-dot-gleaming-idiom-167311.appspot.com/dev/longlist?unique_id=${id}`)
}

const getIdToken = () => {
  var tokenInfo = JSON.parse(window.localStorage.getItem("firebase:authUser:AIzaSyCuJ6Q4R_gki046rem94y8Mb4T_jO4ZlX4:[DEFAULT]"))
  return tokenInfo['stsTokenManager']['accessToken']
}

export default {
	getLongListProfiles,
	getProfileDetail
}
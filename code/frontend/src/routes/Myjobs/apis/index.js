import axios from 'axios';


const apiGetJobList = () => {
  	return axios.get('http://api.gleaming-idiom-167311.appspot.com/api/v1/jobs/', {
  		headers: {'Authorization': 'Bearer ' + getIdToken()}
  	})
}

const getIdToken = () => {
	var tokenInfo = JSON.parse(window.localStorage.getItem("firebase:authUser:AIzaSyCuJ6Q4R_gki046rem94y8Mb4T_jO4ZlX4:[DEFAULT]"))
	return tokenInfo['stsTokenManager']['accessToken']
}

export default {
	apiGetJobList
}
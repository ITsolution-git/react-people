import axios from 'axios';

const apiGetJobTitle = () => {
  return axios.get('https://www.janzz.jobs/japi/labels/?search_lang=all&branch=occupation&output_lang=en&q=Projekt%20Manager&accesskey=378b8b51ef39ce554fdc0d19984bdcdaf4c9b7818342f8966da03e95d7ef7edcd80a9b138582cd99')
}

const apiGetSoftSkills = () => {
  return axios.get('https://www.janzz.jobs/japi/labels/?search_lang=all&branch=softskill&output_lang=en&q=motivation&accesskey=378b8b51ef39ce554fdc0d19984bdcdaf4c9b7818342f8966da03e95d7ef7edcd80a9b138582cd99')
}

const apiGetHardSkills = () => {
  return axios.get('https://www.janzz.jobs/japi/labels/?search_lang=all&branch=skill&output_lang=en&q=schema&accesskey=378b8b51ef39ce554fdc0d19984bdcdaf4c9b7818342f8966da03e95d7ef7edcd80a9b138582cd99')
}

const apiGetProfileLocation = (location) => {
  return axios({
    url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${location}&types=geocode&language=en&key=AIzaSyB8L8lMgAT7pP-wk958Qr5IawS3snUE26g`,
    method: 'get',
  });
}

const apiGetProfileLanguage = () => {
  return axios.get('https://www.janzz.jobs/japi/labels/?search_lang=all&branch=language&output_lang=en&q=engl&accesskey=378b8b51ef39ce554fdc0d19984bdcdaf4c9b7818342f8966da03e95d7ef7edcd80a9b138582cd99')
}

const apiGetProfileProficiency = () => {
  return axios.get('https://www.janzz.jobs/japi/labels/?search_lang=all&branch=language&output_lang=en&q=*&accesskey=378b8b51ef39ce554fdc0d19984bdcdaf4c9b7818342f8966da03e95d7ef7edcd80a9b138582cd99')
}

export default { 
  apiGetJobTitle, 
  apiGetSoftSkills,
  apiGetHardSkills,
  apiGetProfileLanguage,
  apiGetProfileLocation,
  apiGetProfileProficiency
}
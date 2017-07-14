import axios from 'axios';

const apiGetJobTitle = (lang='en', query='*') => {
  return axios.get(`https://www.janzz.jobs/japi/labels/?search_lang=all&branch=occupation&output_lang=${lang}&q=${encodeURI(query)}&accesskey=378b8b51ef39ce554fdc0d19984bdcdaf4c9b7818342f8966da03e95d7ef7edcd80a9b138582cd99`)
}

const apiGetSoftSkills = (lang='en', query='*') => {
  return axios.get(`https://www.janzz.jobs/japi/labels/?search_lang=all&branch=softskill&output_lang=${lang}&q=${encodeURI(query)}&accesskey=378b8b51ef39ce554fdc0d19984bdcdaf4c9b7818342f8966da03e95d7ef7edcd80a9b138582cd99`)
}

const apiGetHardSkills = (lang='en', query='*') => {
  return axios.get(`https://www.janzz.jobs/japi/labels/?search_lang=all&branch=skill&output_lang=${lang}&q=${encodeURI(query)}&accesskey=378b8b51ef39ce554fdc0d19984bdcdaf4c9b7818342f8966da03e95d7ef7edcd80a9b138582cd99`)
}

const apiGetProfileLocation = (lang='en', location) => {
  return axios({
    url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${location}&types=geocode&language=${lang}&key=AIzaSyB8L8lMgAT7pP-wk958Qr5IawS3snUE26g`,
    method: 'get',
  });
}

const apiGetProfileLanguage = (lang='en', query='*') => {
  return axios.get(`https://www.janzz.jobs/japi/labels/?search_lang=all&branch=language&output_lang=${lang}&q=${encodeURI(query)}&accesskey=378b8b51ef39ce554fdc0d19984bdcdaf4c9b7818342f8966da03e95d7ef7edcd80a9b138582cd99`)
}

const apiGetProfileProficiency = (lang='en') => {
  return axios.get(`https://www.janzz.jobs/japi/labels/?search_lang=all&branch=language&output_lang=${lang}&q=*&accesskey=378b8b51ef39ce554fdc0d19984bdcdaf4c9b7818342f8966da03e95d7ef7edcd80a9b138582cd99`)
}

export default { 
  apiGetJobTitle, 
  apiGetSoftSkills,
  apiGetHardSkills,
  apiGetProfileLanguage,
  apiGetProfileLocation,
  apiGetProfileProficiency
}
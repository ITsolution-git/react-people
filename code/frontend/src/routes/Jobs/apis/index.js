import axios from 'axios';

const apiGetJobTitle = (lang='en', query='*') => {

  return axios.get(`https://www.janzz.jobs/japi/labels/?limit=30&lang=${lang}&branch=occupation&q=${encodeURI(query)}&accesskey=378b8b51ef39ce554fdc0d19984bdcdaf4c9b7818342f8966da03e95d7ef7edcd80a9b138582cd99`)
}

const apiGetSoftSkillsRelatedToJobTitle = (lang='en', query='') => {
  return axios.get(`https://www.janzz.jobs/japi/occupation_suggest?lang=${lang}&relation=softskill&ex=e&occupation=${encodeURI(query)}&accesskey=378b8b51ef39ce554fdc0d19984bdcdaf4c9b7818342f8966da03e95d7ef7edcd80a9b138582cd99`)
}

const apiGetHardSkillsRelatedToJobTitle = (lang='en', query='') => {
  return axios.get(`https://www.janzz.jobs/japi/occupation_suggest?lang=${lang}&relation=skill&ex=e&occupation=${encodeURI(query)}&accesskey=378b8b51ef39ce554fdc0d19984bdcdaf4c9b7818342f8966da03e95d7ef7edcd80a9b138582cd99`)
}

const apiGetSoftSkills = (lang='en', query='*') => {
  return axios.get(`https://www.janzz.jobs/japi/labels/?limit=30&lang=${lang}&branch=softskill&q=${encodeURI(query)}&accesskey=378b8b51ef39ce554fdc0d19984bdcdaf4c9b7818342f8966da03e95d7ef7edcd80a9b138582cd99`)
}

const apiGetHardSkills = (lang='en', query='*') => {
  return axios.get(`https://www.janzz.jobs/japi/labels/?limit=30&lang=${lang}&branch=skill&q=${encodeURI(query)}&accesskey=378b8b51ef39ce554fdc0d19984bdcdaf4c9b7818342f8966da03e95d7ef7edcd80a9b138582cd99`)
}

const apiGetProfileLocation = (lang='en', location) => {
  if(location != ''){
    return axios({
      url: `https://dev1-dot-gleaming-idiom-167311.appspot.com/dev/geocode?input=${location}&types=geocode&language=${lang}`,
      method: 'get',
    });    
  }
}

const apiGetProfileLanguage = (lang='en', query='*') => {
  return axios.get(`https://www.janzz.jobs/japi/labels/?limit=30&lang=${lang}&branch=language&q=${encodeURI(query)}&accesskey=378b8b51ef39ce554fdc0d19984bdcdaf4c9b7818342f8966da03e95d7ef7edcd80a9b138582cd99`)
}

const apiGetProfileProficiency = (lang='en') => {
  return axios.get(`https://www.janzz.jobs/japi/labels/?limit=30&lang=${lang}&branch=language&q=*&accesskey=378b8b51ef39ce554fdc0d19984bdcdaf4c9b7818342f8966da03e95d7ef7edcd80a9b138582cd99`)
}

export default { 
  apiGetJobTitle, 
  apiGetSoftSkills,
  apiGetHardSkills,
  apiGetProfileLanguage,
  apiGetProfileLocation,
  apiGetProfileProficiency,
  apiGetSoftSkillsRelatedToJobTitle,
  apiGetHardSkillsRelatedToJobTitle
}
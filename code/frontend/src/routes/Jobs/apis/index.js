import axios from 'axios';

export const apiGetJobTitle = () => {
  return axios.get('https://www.janzz.jobs/japi/labels/?branch=softskill&q=Projekt&accesskey=378b8b51ef39ce554fdc0d19984bdcdaf4c9b7818342f8966da03e95d7ef7edcd80a9b138582cd99')
}
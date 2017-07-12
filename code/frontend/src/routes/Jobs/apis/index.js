import axios from 'axios';

export const apiGetJobTitle = () => {
  return axios.get('https://www.janzz.jobs/japi/concepts?search_lang=all&output_lang=en&branch=occupation&q=Projekt%20Manager',{
    'headers': {'Authorization': 'Token 480713dc16970b8f29af174b1b09c476132360e036fd8423e9cf22680f44ac6230394074899de501',
      'meta':'adasd'}
  })
}
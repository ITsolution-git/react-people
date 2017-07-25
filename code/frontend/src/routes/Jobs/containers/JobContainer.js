import React, { Component, cloneElement, PropTypes } from 'react'
import { map } from 'lodash'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  populatedDataToJS,
  pathToJS,
  isLoaded,
  isEmpty
} from 'react-redux-firebase'
import sha256 from 'js-sha256'
import { JOB_PATH, ID_JOB_PATH,MY_JOB_PATH,SHA256_KEY,LONG_LIST_PATH } from 'constants'
import { UserIsAuthenticated } from 'utils/router'
import LoadingSpinner from 'components/LoadingSpinner'
import NewJobComponent from '../components/NewJobComponent'
import classes from './JobContainer.scss'
import Api from '../apis'


const populates = [
  { child: 'createdBy', root: 'users', keyProp: 'uid' }
]

@UserIsAuthenticated
@firebaseConnect()
@connect(
  ({ firebase }) => ({
    auth: pathToJS(firebase, 'auth'),
    account: pathToJS(firebase, 'profile')
  })
)
export default class Jobs extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  static propTypes = {
    jobs: PropTypes.object,
    firebase: PropTypes.object,
    auth: PropTypes.object,
    children: PropTypes.object,
    account: PropTypes.object,
    params: PropTypes.object
  }

  state = {
    newJob: true,
    myJob: false,
    occupations: [],
    soft_skills: [],
    def_soft_skills: [],
    hard_skills:[],
    def_hard_skills: [],
    profile_locations: [],
    profile_language_names:[],
    profile_language_proficiencys:[],
    lang: 'en',
    id: 1223232342
  }

  /*
  * internal methods
  */
  createLabels(data) {
    let resData = data.map((item) => {
      return {
          value: item.label,
          text: item.label
      }
    });
    return resData;
  }

  createLabelsLocation(data) {
    let resData = data.map((item) => {
      return {
          value: item.description,
          text: item.description
      }
    });
    return resData;
  }

  createLabelsSkill(data){
    let resData = data.map((item) => {
      return {
        value: item.label,
        label: item.label
      }
    });
    console.log(resData)
    return resData;
  }

  apiCall(lang){
    Api.apiGetJobTitle(lang)
    .then(res => {
        let occupations = this.createLabels(res.data);
        this.setState({occupations: occupations});
    });

    Api.apiGetSoftSkills(lang)
    .then(res => {
        let soft_skills = this.createLabels(res.data);
        this.setState({soft_skills: soft_skills});
    });

    Api.apiGetHardSkills(lang)
    .then(res => {
        let hard_skills = this.createLabels(res.data);
        this.setState({hard_skills: hard_skills});
    });

    Api.apiGetProfileLanguage(lang)
    .then(res => {
        let profile_language_names = this.createLabels(res.data);
        this.setState({profile_language_names: profile_language_names});
    });
  }

  /*
  * component apis
  */
  componentWillMount(){
    console.log(this.props.params)
  }

  componentDidMount(){
    setTimeout(()=> {
      var { auth, account } = this.props
      if(auth != undefined){
        let hash = sha256.hmac(SHA256_KEY, auth.email);
        window.dataLayerCall(auth.email, account.name + ' ' + account.surname, hash);
      }      
    }, 1000);

    this.apiCall(this.state.lang);
  }

  /*
  * handlers
  */
  handleLocation(lang, location){
    if(location == '') return;
    
    Api.apiGetProfileLocation(lang, location)
    .then(res => {
      let profile_locations = this.createLabelsLocation(res.data.predictions);
      console.log(profile_locations)
      this.setState({profile_locations: profile_locations});
    })
  }

  handleChangeLang(lang) {
    if(lang != this.state.lang){
      this.apiCall(lang);
      this.setState({lang: lang})
    }
  }

  handleChangeJobTitle(lang, search_text) {
    Api.apiGetJobTitle(lang, search_text)
    .then(res => {
        let occupations = this.createLabels(res.data);
        if(occupations != []){
          this.setState({occupations: occupations});          
        }
    });
  }

  handleChangeProfileLanguage(lang, search_text){
    Api.apiGetProfileLanguage(lang, search_text)
    .then(res => {
        let profile_language_names = this.createLabels(res.data);
        this.setState({profile_language_names: profile_language_names});
    });
  }

  handleChangeSoftSkills(lang, search_text){
    Api.apiGetSoftSkills(lang, search_text)
    .then(res => {
        let soft_skills = this.createLabels(res.data);
        this.setState({soft_skills: soft_skills});
    });
  }

  handleChangeHardSkills(lang, search_text){
    Api.apiGetHardSkills(lang, search_text)
    .then(res => {
        let hard_skills = this.createLabels(res.data);
        this.setState({hard_skills: hard_skills});
    });
  }

  handleOccupationForSoftSkill(lang, search_text){
    Api.apiGetSoftSkillsRelatedToJobTitle(lang, search_text)
    .then(res => {
      console.log("res ", res);
      let soft_skills = this.createLabelsSkill(res.data.results);
      this.setState({def_soft_skills: soft_skills});      
      
    })
  }

  handleOccupationForHardSkill(lang, search_text) {
    Api.apiGetHardSkillsRelatedToJobTitle(lang, search_text)
    .then(res => {
      console.log("res ", res);
      let hard_skills = this.createLabelsSkill(res.data.results);
      this.setState({def_hard_skills: hard_skills});

      
    })
  }

  handlePostJob(body) {
    // this.context.router.push(`${MY_JOB_PATH}`);
    Api.apiPostJob(body)
    .then(res => {
      console.log('res', res)
      this.context.router.push(`${MY_JOB_PATH}`);
    })
  }

  handleFindTalent(){
    this.context.router.push(LONG_LIST_PATH)
  }

  /*
  * render method
  */
  render () {
    const {auth, params } = this.props

    if (!isLoaded(auth)) {
      return <LoadingSpinner />
    }

    // Project Route is being loaded
    if (this.props.children) {
      // pass all props to children routes
      return cloneElement(this.props.children, this.props)
    }
    let newOrEdit = false
    console.log(params.id)
    if (params.id != undefined){
      newOrEdit = true
    }
    console.log(newOrEdit)
    const { newJob } = this.state

    return (
      <div className={classes.container}>
          <NewJobComponent              
            occupations={this.state.occupations}  
            soft_skills={this.state.soft_skills}
            def_soft_skills={this.state.def_soft_skills}
            hard_skills={this.state.hard_skills}
            def_hard_skills={this.state.def_hard_skills}
            profile_locations={this.state.profile_locations}
            profile_language_names={this.state.profile_language_names}
            key={this.state.id}
            handleLocation={this.handleLocation.bind(this)}
            handleChangeLang={this.handleChangeLang.bind(this)}
            handleChangeJobTitle={this.handleChangeJobTitle.bind(this)}
            handleChangeProfileLanguage={this.handleChangeProfileLanguage.bind(this)}
            handleChangeSoftSkills={this.handleChangeSoftSkills.bind(this)}
            handleChangeHardSkills={this.handleChangeHardSkills.bind(this)}
            handleFindTalent={this.handleFindTalent.bind(this)}
            handleOccupationForSoftSkill={this.handleOccupationForSoftSkill.bind(this)}
            handleOccupationForHardSkill={this.handleOccupationForHardSkill.bind(this)}
            handlePostJob={this.handlePostJob.bind(this)}
          />          
      </div>
    )
  }
}

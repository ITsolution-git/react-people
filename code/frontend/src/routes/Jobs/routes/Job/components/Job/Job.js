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
import EditJobComponent from '../../../../components/EditJobComponent'
import classes from './Job.scss'
import Api from '../../../../apis'

export default class Job extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  static propTypes = {
    params: PropTypes.object
  }

  state = {
  	id: "",
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

  setData(data){
  	this.setState({
  		occupations:[data.occupation],
  		def_soft_skills:this.createLabelsSkillDetail(data.softskill_list),
  		soft_skills: [],
  		hard_skills: [],
  		def_hard_skills: this.createLabelsSkillDetail(data.skill_list),
  		profile_language_names: this.createLabelsLangDetail(data.language_list),
  		profile_locations: this.createLabelsLocationDetail(data.location_list),
  		profile_language_proficiencys: this.createLabelsLangProfDetail(data.language_list)
  	})
  }

  createLabelsSkillDetail(data){
  	let resData = data.map((item) => {
      return {
        value: item.skill,
        label: item.skill
      }
    });

    return resData;
  }

  createLabelsLangDetail(data){
  	let resData = data.map((item) => {
      return {
        value: item.name,
        label: item.name
      }
    });
    if(resData.length == 0)
    	resData.push({
    		value: '',
    		label: ''
    	});
    return resData;
  }

  createLabelsLangProfDetail(data){
  	let resData = data.map((item) => {
      return {
        value: item.proficiency,
        text: item.proficiency
      }
    });
    if(resData.length == 0)
    	resData.push({
    		value: 0,
    		label: 0
    	});
    return resData;
  }

  createLabelsLocationDetail(data){
  	let resData = data.map((item) => {
      return {
        value: item.name,
        text: item.name
      }
    });
    if(resData.length == 0)
    	resData.push({
    		value: '',
    		label: ''
    	});
    return resData;
  }  

  /*
  * component apis
  */
  componentWillMount(){
    let id = this.props.params.id
    Api.apiGetJobWithId(id)
    .then(res => {
    	console.log("----------------------------------")
    	console.log(res.data);
    	this.setData(res.data)
    })
  }

  componentDidMount(){
    // setTimeout(()=> {
    //   var { auth, account } = this.props
    //   if(auth != undefined){
    //     let hash = sha256.hmac(SHA256_KEY, auth.email);
    //     window.dataLayerCall(auth.email, account.name + ' ' + account.surname, hash);
    //   }      
    // }, 1000);

    // this.apiCall(this.state.lang);
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

    // if (!isLoaded(auth)) {
    //   return <LoadingSpinner />
    // }

    // Project Route is being loaded
    // if (this.props.children) {
    //   // pass all props to children routes
    //   return cloneElement(this.props.children, this.props)
    // }

    return (
      <div className={classes.container}>
        <EditJobComponent              
          occupations={this.state.occupations}  
          soft_skills={this.state.soft_skills}
          def_soft_skills={this.state.def_soft_skills}
          hard_skills={this.state.hard_skills}
          def_hard_skills={this.state.def_hard_skills}
          profile_locations={this.state.profile_locations}
          profile_language_names={this.state.profile_language_names}
          profile_language_proficiencys={this.state.profile_language_proficiencys}
          key={this.state.id}
          id={this.props.params.id}
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


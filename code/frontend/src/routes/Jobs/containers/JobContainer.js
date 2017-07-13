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
import { JOB_PATH, NEW_JOB_PATH } from 'constants'
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
  ({ firebase }, { params }) => ({
    auth: pathToJS(firebase, 'auth'),
    // projects: populatedDataToJS(firebase, 'projects', populates)
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
  }

  state = {
    newJob: true,
    myJob: false,
    occupations: [],
    soft_skills: [],
    hard_skills:[],
    profile_locations: [],
    profile_language_names:[],
    profile_language_proficiencys:[],
  }

  /*
  * internal methods
  */
  createLabelsJobTitle(data) {
    let resData = data.map((item) => {
      return {
          value: item.concept_id,
          text: item.label
      }
    });
    return resData;
  }

  createLabelsLocation(data) {
    let resData = data.map((item) => {
      return {
          value: item.place_id,
          text: item.description
      }
    });
    return resData;
  }

  /*
  * component apis
  */
  componentDidMount(){
    setTimeout(()=> {
      var { auth } = this.props
      if(auth != undefined){
        window.dataLayerCall(auth.email)
      }      
    }, 1000);

    Api.apiGetJobTitle()
    .then(res => {
        let occupations = this.createLabelsJobTitle(res.data);
        this.setState({occupations: occupations});
    });

    Api.apiGetSoftSkills()
    .then(res => {
        let soft_skills = this.createLabelsJobTitle(res.data);
        this.setState({soft_skills: soft_skills});
    });

    Api.apiGetHardSkills()
    .then(res => {
        let hard_skills = this.createLabelsJobTitle(res.data);
        this.setState({hard_skills: hard_skills});
    });

    Api.apiGetProfileLanguage()
    .then(res => {
        let profile_language_names = this.createLabelsJobTitle(res.data);
        this.setState({profile_language_names: profile_language_names});
    });

    Api.apiGetProfileProficiency()
    .then(res => {
        let profile_language_proficiencys = this.createLabelsJobTitle(res.data);
        this.setState({profile_language_proficiencys: profile_language_proficiencys});
    });
  }

  handleLocation(location){
    Api.apiGetProfileLocation(location)
    .then(res => {
      let profile_locations = this.createLabelsLocation(res.data.predictions);
      console.log(profile_locations)
      this.setState({profile_locations: profile_locations});
    })
  }

  /*
  * render method
  */
  render () {
    const {auth } = this.props

    if (!isLoaded(auth)) {
      return <LoadingSpinner />
    }

    // Project Route is being loaded
    if (this.props.children) {
      // pass all props to children routes
      return cloneElement(this.props.children, this.props)
    }

    const { newJob } = this.state

    return (
      <div className={classes.container}>
        {
          newJob &&
            <NewJobComponent
              key={1} 
              occupations={this.state.occupations}  
              soft_skills={this.state.soft_skills}
              hard_skills={this.state.hard_skills}
              profile_locations={this.state.profile_locations}
              profile_language_names={this.state.profile_language_names}
              profile_language_proficiencys={this.state.profile_language_proficiencys}
              handleLocation={this.handleLocation.bind(this)}
            />
        }        
      </div>
    )
  }
}

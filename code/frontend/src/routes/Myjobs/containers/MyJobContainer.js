import React, { Component, PropTypes } from 'react'
import { map } from 'lodash'
import { Link } from 'react-router'
import GoogleButton from 'react-google-button'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  pathToJS
} from 'react-redux-firebase'
import Paper from 'material-ui/Paper'
import Snackbar from 'material-ui/Snackbar'
import { UserIsAuthenticated } from 'utils/router'
import OneJobComponent from '../components/OneJobComponent'
import classes from './MyJobContainer.scss'
import Api from '../apis'

@UserIsAuthenticated // redirect to list page if logged in
@firebaseConnect() // add this.props.firebase
@connect( // map redux state to props
  ({firebase}) => ({
    auth: pathToJS(firebase, 'auth')    
  })
)
export default class Signup extends Component {
  static propTypes = {
    firebase: PropTypes.object,
    auth: PropTypes.object,
  }

  state = {
    snackCanOpen: false,
    profiles: []
  }

   /*
  * component apis
  */
  componentDidMount(){
    Api.getLongListProfiles()
    .then(res => {
      this.setState({profiles:res.data.results });
    })
  }

  render () {
    return (
      <div className={classes.container}>
        {
          map(this.state.profiles, (profile, key) => (
            <OneJobComponent
              key={profile.id}
              id={profile.id}
              type={profile.janzz_typ}
              picture={profile.image_url}
              name={profile.given_name}
              surname={profile.family_name}
              company={profile.company}
              hiredate={profile.hire_start_dt}
              industry={profile.industry}
              location={profile.location}
              url={profile.profile_url}
              title={profile.title}
              language={profile.language_captured}
              score={profile.score}
            />   
          ))
        }
      </div>
    )
  }
}

import React, { Component, PropTypes } from 'react'
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
    snackCanOpen: false
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
  }

  render () {
    return (
      <div className={classes.container}>
        <OneJobComponent />
      </div>
    )
  }
}

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
    children: PropTypes.object
  }

  state = {
    newJob: true,
    myJob: false
  }

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
            <NewJobComponent />
        }        
      </div>
    )
  }
}

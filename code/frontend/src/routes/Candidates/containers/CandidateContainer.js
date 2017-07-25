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
import sha256 from 'js-sha256'
import Paper from 'material-ui/Paper'
import Snackbar from 'material-ui/Snackbar'
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { JOB_PATH, ID_JOB_PATH , MY_JOB_PATH, SHA256_KEY } from 'constants'
import { UserIsAuthenticated } from 'utils/router'
import OneCanComponent from '../components/OneCanComponent'
import LoadingSpinner from 'components/LoadingSpinner'
import classes from './CandidateContainer.scss'
import Api from '../apis'
import InfiniteScroll from 'react-infinite-scroller';

@UserIsAuthenticated // redirect to list page if logged in
@firebaseConnect() // add this.props.firebase
@connect( // map redux state to props
  ({firebase}) => ({
    auth: pathToJS(firebase, 'auth'),    
    account: pathToJS(firebase, 'profile')    
  })
)
export default class CandidateContainer extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  
  static propTypes = {
    firebase: PropTypes.object,
    auth: PropTypes.object,
  }

  state = {
    snackCanOpen: false,
    profiles: [],
    profiles:[],
    loading: true,
    open: false,
    langlevel: 1,
    limit: 10
  }

   /*
  * component apis
  */
  componentDidMount(){
    setTimeout(()=> {
      var { auth, account } = this.props
      if(auth != undefined){
        let hash = sha256.hmac(SHA256_KEY, auth.email);
        window.dataLayerCall(auth.email, account.name + ' ' + account.surname, hash);
      }      
    }, 1000);

    // Api.getLongListProfiles()
    // .then(res => {
    //   this.setState({profiles:res.data.results });
    //   this.setState({loading: false});
    // })
  }

  handleLangLevelChange = (event, index, value) => this.setState({langlevel:value});

  handleToggle = () => this.setState({open: !this.state.open});

  handleNavigate(id){
    this.context.router.push(`${JOB_PATH}/${id}`);
  }

  getDate() {
    return (new Date().toISOString().slice(0,10).replace(/-/g,""))
  }

  loadItems() {
    console.log(this.state.limit)
    Api.getLongListProfiles(this.state.limit)
    .then(res => {
      console.log(res.data.results.length)
      this.setState({profiles:res.data.results });
      let limit = res.data.results.length + 10;
      this.setState({limit: limit});
    })
  }

  render () {
    console.log(this.state.profiles)
    return (
      <div className={classes.container}>
        <InfiniteScroll
            pageStart={0}
            loadMore={this.loadItems.bind(this)}
            hasMore={true}
            loader={<LoadingSpinner />}
            useWindow={false}
        >
        {
          map(this.state.profiles, (profile, key) => (
            <OneCanComponent
              key={key}
              id={key}
              profile={profile}
            />   
          ))
        }
        </InfiniteScroll>
      </div>
    )
  }
}

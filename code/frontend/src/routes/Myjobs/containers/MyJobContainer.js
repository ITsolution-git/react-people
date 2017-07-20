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
import { SHA256_KEY } from 'constants'
import { UserIsAuthenticated } from 'utils/router'
import OneJobComponent from '../components/OneJobComponent'
import LoadingSpinner from 'components/LoadingSpinner'
import classes from './MyJobContainer.scss'
import Api from '../apis'

@UserIsAuthenticated // redirect to list page if logged in
@firebaseConnect() // add this.props.firebase
@connect( // map redux state to props
  ({firebase}) => ({
    auth: pathToJS(firebase, 'auth'),    
    account: pathToJS(firebase, 'profile')    
  })
)
export default class Signup extends Component {
  static propTypes = {
    firebase: PropTypes.object,
    auth: PropTypes.object,
  }

  state = {
    snackCanOpen: false,
    profiles: [],
    loading: true,
    open: false,
    langlevel: 1
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

    Api.getLongListProfiles()
    .then(res => {
      this.setState({profiles:res.data.results });
      this.setState({loading: false});
    })
  }

  handleLangLevelChange = (event, index, value) => this.setState({langlevel:value});

  handleToggle = () => this.setState({open: !this.state.open});


  render () {
    const { profiles } = this.props

    // if (profiles == undefined) {
    //   return <LoadingSpinner />
    // }

    return (
      <div className={classes.container}>
        <div className="row">
            <RaisedButton
              label="Filter"
              onTouchTap={this.handleToggle}
            />
            <Drawer
              openSecondary={true} 
              open={this.state.open}
              onRequestChange={(open) => this.setState({open})}
              docked={false}>
              <AppBar title="Filter" />
              <TextField
                   hintText=""
                   floatingLabelText="Level of Working Experience"
                   style={{marginLeft: '1rem', fontSize: '0.8rem'}}
                 />
              <TextField
                   hintText=""
                   floatingLabelText="Level of Industry Experience"
                   style={{marginLeft: '1rem', fontSize: '0.8rem'}}
                 />
              <TextField
                   hintText=""
                   floatingLabelText="Age"
                   style={{marginLeft: '1rem', fontSize: '0.8rem'}}
                 />

              <TextField
                   hintText=""
                   floatingLabelText="Level of Education"
                   style={{marginLeft: '1rem', fontSize: '0.8rem'}}
                 />
              <TextField
                   hintText=""
                   floatingLabelText="Size of Company"
                   style={{marginLeft: '1rem', fontSize: '0.8rem'}}
                 />
              <TextField
                   hintText="Country of Name"
                   floatingLabelText="Location"
                   style={{marginLeft: '1rem', fontSize: '0.8rem'}}
                 />

              <TextField
                   hintText=""
                   style={{marginLeft: '1rem', fontSize: '0.8rem'}}
                   floatingLabelText="Languages"
                 />
              <SelectField
                floatingLabelText="Level of Secondary Language"
                onChange={this.handleLangLevelChange.bind(this)}
                value={this.state.langlevel}
                style={{marginLeft: '1rem', fontSize: '0.8rem'}}
              >
                <MenuItem value={1} primaryText="Elementary proficiency" />
                <MenuItem value={2} primaryText="Limited working proficiency" />
                <MenuItem value={3} primaryText="Full professional proficiency" />
                <MenuItem value={4} primaryText="Native or bilingual proficiency" />
              </SelectField>

              <FlatButton label="Apply Filter" secondary={true} style={{'width': '100%'}} />
            </Drawer>
          </div>
        {
          this.state.loading &&
            <LoadingSpinner />
        }

        {          
          map(this.state.profiles, (profile, key) => (
            <OneJobComponent
              key={profile.id}
              id={profile.id}
              type={profile.janzz_typ}
              picture={profile.image_url}
              name={profile.given_name}
              surname={profile.family_name}
              company={profile.company || ''}
              hiredate={profile.hire_start_dt || ''}
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

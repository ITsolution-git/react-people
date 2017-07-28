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
import { 
  JOB_PATH, 
  ID_JOB_PATH,
  PROFILE_DETAIL_PATH,
  SHA256_KEY } from 'constants'
import { UserIsAuthenticated } from 'utils/router'
import ChangePassword from '../components/ChangePassword'
import LoadingSpinner from 'components/LoadingSpinner'
import classes from './ProfileContainer.scss'
// import Api from '../apis'

@UserIsAuthenticated // redirect to list page if logged in
@firebaseConnect() // add this.props.firebase
@connect( // map redux state to props
  ({firebase}) => ({
    auth: pathToJS(firebase, 'auth'),    
    account: pathToJS(firebase, 'profile')    
  })
)
export default class ProfileContainer extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  
  static propTypes = {
    firebase: PropTypes.object,
    auth: PropTypes.shape({
      uid: PropTypes.string,
      reauthenticateWithCredential: PropTypes.func
    }),
  }

  state = {
    snackCanOpen: false,
    profile: {},
    loading: true,
    open: false,
    langlevel: 1,
    checkOldPwd: true,
    message: ''
  }

   /*
  * component apis
  */
  componentWillMount(){
    
  }
  
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
    //   this.setState({jobs:res.data.results });
    //   this.setState({loading: false});
    // })

    setTimeout(()=> {
      let profile = {
          "id": 9283,
          "internal_id": "f672b9f39141e1c4",
          "janzz_type": 10,
          "given_name": "Jan",
          "family_name": "Heuser",
          "industry": "Packaging and Containers",
          "location": "Stuttgart Area, Germany",
          "skills": "Automotive,Key Account Management,Plastics,Product Development,Negotiation,PPAP,Continuous Improvement,Project Management,Lean Manufacturing,Sales,Forecasting,Fuel Systems,Exterior Lighting,Innovation Management,FMEA,Exterior Components,Interior Components,Interconnect Components,Wire Harness Business,Plastic Components,Restructuring,Strategic Planning,Leadership,Lighting,Manufacturing,Management,New Business Development",
          "profile_url": "http://www.linkedin.com/in/jan-heuser-20927a7",
          "title": "Director Sales - Molding Europe at Storopack Deutschland",
          "picture": "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAO9AAAAJDRlOWY0YzQyLWQxMWItNDlmNi1iZTNiLTJmMzM3NjZkMmJmNw.jpg",
          "jobtitle": "Account Manager",
          "language_captured": "en",
          "education_list": [
            {
              "name":"Hotelschool The Hague",
              "degree":"Bachelor's degree/University primary qualification",
              "from":"2010",
              "to":"Present",
              "thumbnail":"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            },
            {
              "name":"Markus Verbeek Amsterdam",
              "degree":"Master's degree",
              "from":"2014",
              "to":"Present",
              "thumbnail":"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            }
          ],
          "experience_list": [
            {
              "name":"Senior Marketeer",
              "company": "Binnenlands Bestuur BV",
              "date_range":"Dec 2013 – Present",
              "location":"Amsterdam Area, Netherlands",
              "description":'<p>Opstellen en uitvoeren marketingcommunicatieplannen. Budgetverantwoordelijkheid,<br>Uitvoeren, coördineren en evalueren van online en offline campagnes. Werving van bezoekers en exposanten bij beurzen/congressen, Initiëren en (laten) uitvoeren van bereiksonderzoeken, markt- &amp; concurrentieonderzoeken. Vertalen van onderzoeksresultaten in relevante verkoopargumentatie. Database-marketing. Samenwerking externe organisaties (dual branding).</p>',
              "thumbnail":"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            },
            {
              "name":"Marketeer",
              "company": "Kluwer",
              "date_range":"Apr 2005 – Dec 2013",
              "location":"Alphen aan den Rijn",
              "description":'<p> Opstellen en uitvoeren marketingcommunicatieplannen.<br>Uitvoeren, coördineren en evalueren van online en printcampagnes. Werving van bezoekers en exposanten bij beursdeelname, Initiëren en (laten) uitvoeren van bereiksonderzoeken, markt- &amp; concurrentieonderzoeken. <br>Vertalen van onderzoeksresultaten in relevante verkoopargumentatie.</p>',
              "thumbnail":"https://media.licdn.com/mpr/mpr/shrinknp_100_100/AAEAAQAAAAAAAALmAAAAJDcxNDk4YzQzLWQxYjYtNGM2Yy1iNTUwLTZjNzk3YmJiMzRiYg.png"
            },
            {
              "name":"Marketing Medewerker/Mediaplanner",
              "company": "Reed Business Information",
              "date_range":"Nov 2000 – Apr 2005",
              "location":"Amsterdam Area, Netherlands",
              "description":'',
              "thumbnail":"https://media.licdn.com/mpr/mpr/shrinknp_100_100/AAEAAQAAAAAAAAVLAAAAJGFkNzRkZDUxLTM2ZjQtNGExNS1hOTZhLTlhYTZjZDQwMGE3Mg.png"
            }
          ]
        }
      this.setState({profile: profile})
      this.setState({loading: false});
    }, 10)    
  }

  handleNavigate(){
    this.context.router.push(`${JOB_PATH}`);
  }

  handleCheckOldPassword(oldPwd) {
    if (isLoaded(this.props.auth)){
      const credential = this.props.firebase.auth.EmailAuthProvider.credential(
          this.props.auth.email, 
          oldPwd
      );
      this.props.auth.reauthenticate(credential)
      .then(() => {
        this.setState({checkOldPwd: false})
      })
      .catch(() => {
        this.setState({message: 'Password is not correct, Please try again!'})
        this.setState({checkOldPwd: true})
      })      
    }
  }

  handleChangePassword(password) {
    this.props.auth.updatePassword(password)
    .then(()=> {
      this.setState({message: 'Update Successfully!'})
    })
  }

  changeOldKey() {
    this.setState({message: ''})
  }

  render () {
    const { profile } = this.state
    const { auth } = this.props
    
    if (!isLoaded(auth)) {
      return <LoadingSpinner />
    }

    return (
      <div className={classes.container}>
        <ChangePassword
          checkOldPwd={this.state.checkOldPwd}
          handleChangePassword={this.handleChangePassword.bind(this)}
          handleCheckOldPassword = {this.handleCheckOldPassword.bind(this)}
          changeOldKey = {this.changeOldKey.bind(this)}
          message={this.state.message}
        />
      </div>
    )
  }
}

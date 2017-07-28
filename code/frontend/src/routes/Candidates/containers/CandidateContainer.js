import React, { Component,cloneElement, PropTypes } from 'react'
import ReactDOM from 'react-dom';
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
import {  LONG_LIST_PATH,
          LONG_LIST_DETAIL_PATH, 
          SHA256_KEY } from 'constants'
import { UserIsAuthenticated } from 'utils/router'
import OneCanComponent from '../components/OneCanComponent'
import LoadingSpinner from 'components/LoadingSpinner'
import classes from './CandidateContainer.scss'
import Api from '../apis'
import InfiniteScroll from 'react-infinite-scroller';
import Dialog from 'material-ui/Dialog';

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
    open_dialog: false,
    langlevel: 1,
    limit: 10,
    hasmore: true,
    countryCode: '*',
    countryCodeForFilter: "*",
    useWindow: false,
    id_cans: [],
    not_checked_id:0,
    message: "",
    title: ""
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
  }

  handleLangLevelChange = (event, index, value) => this.setState({langlevel:value});

  handleToggle = () => this.setState({open: !this.state.open});

  getDate() {
    return (new Date().toISOString().slice(0,10).replace(/-/g,""))
  }

  loadItems(page, flag=false) {
    Api.getLongListProfiles(this.state.limit, this.state.countryCode)
    .then(res => {    
      console.log(res)
      console.log(flag)
      let limit = res.data.results.length + 10;
      if(limit > this.state.limit && flag == false){
        console.log("pagination")
        this.setState({profiles:res.data.results });
        this.setState({limit: limit});
        // this.setState({hasmore: false})
      }else if(flag == true){
        console.log("new data")
        this.setState({profiles:res.data.results });
        this.setState({limit: 10});
      }
    })
  }

  handleChangeCountry(event, index, value) {
    this.setState({countryCodeForFilter: value});
  }

  handleApplyFilter() {
    this.setState({open: false})
    this.setState({countryCode: this.state.countryCodeForFilter})
    this.setState({limit: 10})
    this.loadItems(0, true)
  }

  handleGotoProfileDetail(id){
    
  }

  _handleScroll(e){
    console.log("fdasfdsafds")
  }

  handleCheck(id, isChecked){
    let ids = this.state.id_cans
    ids = ids.filter((i) => {
      return i != id 
    })
    if (isChecked) {
      if (ids.length >= 10){
        this.handleOpen(id)
      }else{
        ids.push(id)        
        this.setState({not_checked_id: 0})
      }
    }
    this.setState({id_cans: ids})
  }

  handleOpen = (id) => {
    this.setState({title: "Choose Candidates"})
    this.setState({message: "You can only have 10 candidates in a short list"})
    this.setState({open_dialog: true});
    this.setState({not_checked_id: id})
  };

  handleClose = () => {
    this.setState({open_dialog: false});
  };

  handleMakeShortList() {
    let ids = this.state.id_cans
    if (ids.length == 0) {
      this.setState({title: "Make List"})
      this.setState({message: "You might want to choose the candidates you like"})
      this.setState({open_dialog: true});
    }
  }

  render () {

    if (this.props.children) {
      // pass all props to children routes
      return cloneElement(this.props.children, this.props)
    }
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];

    return (
      <div className={classes.container} onScroll={(e)=>{ this._handleScroll.bind(this)}}>
        <div>
          <RaisedButton
            label="Filter Talent"
            onTouchTap={this.handleToggle}
          />
          <RaisedButton
            label="Make Short List"
            onTouchTap={this.handleMakeShortList.bind(this)}
          />
          <Drawer 
            openSecondary={true} 
            open={this.state.open} 
            docked={false}
            onRequestChange={(open) => this.setState({open})}
          >
            <AppBar title="Filter" />
            <div className={classes.filter}>
                <SelectField
                  floatingLabelText="Country of Company"
                  value={this.state.countryCodeForFilter}
                  onChange={this.handleChangeCountry.bind(this)}
                >
                  <MenuItem value={'*'} primaryText="Any" />
                  <MenuItem value={'de'} primaryText="Germany" />
                  <MenuItem value={'ch'} primaryText="Switzerland" />
                  <MenuItem value={'fr'} primaryText="France" />
                </SelectField>
                <RaisedButton
                  label="Apply"
                  onTouchTap={this.handleApplyFilter.bind(this)}
                />
            </div>
          </Drawer>

          <Dialog
            title={this.state.title}
            actions={actions}
            modal={false}
            open={this.state.open_dialog}
            onRequestClose={this.handleClose}
          >
            {this.state.message}
          </Dialog>
        </div>

        <InfiniteScroll
            pageStart={0}
            loadMore={this.loadItems.bind(this)}
            hasMore={this.state.hasmore}
            loader={<LoadingSpinner />}
            useWindow={false}
        >
        {
          map(this.state.profiles, (profile, key) => (
            <OneCanComponent
              key={key}
              id={profile.id}
              profile={profile}
              handleGotoProfileDetail={()=>this.context.router.push(`${LONG_LIST_PATH}/${profile.internal_id}`)}
              handleCheck={this.handleCheck.bind(this)}
              not_checked_id={this.state.not_checked_id}
            />   
          ))
        }
        </InfiniteScroll>
      </div>
    )
  }
}

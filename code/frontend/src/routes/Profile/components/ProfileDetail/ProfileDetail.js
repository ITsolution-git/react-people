import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import TextField from 'components/TextField'
import { required } from 'utils/forms'
import classes from './ProfileDetail.scss'

import Divider from 'material-ui/Divider';
import CommunicationLocationOn from 'material-ui/svg-icons/communication/location-on';
import ActionLanguage from 'material-ui/svg-icons/action/language';
import ActionAccountBalance from 'material-ui/svg-icons/action/account-balance';
import ImageCamera from 'material-ui/svg-icons/image/camera';
import SvgIcon from 'material-ui/SvgIcon';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';
import {indigo500} from 'material-ui/styles/colors';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import icons from "react-morph-material-icons/build/shapes";

import Education from "../education"
import Experience from "../experience"

const styles = {
  chip: {
    margin: 4,
    float: "left"
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  paper: {
    padding: '1rem'
  }
};

export default class ProfileDetailComponent extends Component {
  static propTypes = {
    profile: PropTypes.object
  }

  state = {
    open: this.props.open || false
  }

  handleGotoLinkedin(){
    const { profile } = this.props
    if(profile.profile_url != ""){
      let win = window.open(profile.profile_url, '_blank');
      win.focus();
    }
  }

  render () {
    const { profile } = this.props
    const icon = {
      'linkedin': icons.web.linkedin_box
    }
    const LikedinIcon = (props) => (
      <SvgIcon {...props}>
        <path d="M19 19h-3v-5.3a1.5 1.5 0 0 0-1.5-1.5 1.5 1.5 0 0 0-1.5 1.5V19h-3v-9h3v1.2c.5-.84 1.59-1.4 2.5-1.4a3.5 3.5 0 0 1 3.5 3.5M6.5 8.31c-1 0-1.81-.81-1.81-1.81A1.81 1.81 0 0 1 6.5 4.69c1 0 1.81.81 1.81 1.81A1.81 1.81 0 0 1 6.5 8.31M8 19H5v-9h3m12-8H4c-1.11 0-2 .89-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4c0-1.11-.9-2-2-2z"/>
      </SvgIcon>
    );

    let skills = []
    if(profile != {}){
      skills = profile.skills.split(',').map((skill, key) => {
        return (<Chip style={styles.chip} key={key}>
                  {skill}      
                </Chip>)
      })      
    }

    return (
      <div className="row">
        <div className="col-xs-5 col-sm-5 col-md-5">
          <div className="row center-xs center-sm">
              <div className="col-xs-10 col-sm-10">
                  <img src={profile.picture} className={classes.profile_image} alt="" />
                  <h2 className={classes.name}> {profile.given_name} {profile.family_name}</h2>
                  <h4 className={classes.title}> {profile.title} </h4>
                  <h4 className={classes.title}> {profile.jobtitle} </h4>
                  
                  <List>
                    <ListItem 
                        style={{textAlign: "left"}}
                        disabled={true} 
                        leftIcon={<ActionAccountBalance color={indigo500} />}>
                      {profile.industry}
                    </ListItem>
                    <ListItem
                        style={{textAlign: "left"}}
                        disabled={true}
                        leftIcon={<CommunicationLocationOn color={indigo500} />} >
                      {profile.location}
                    </ListItem>
                    <ListItem
                        style={{textAlign: "left", cursor: "pointer"}}
                        // disabled={true}
                        leftIcon={<LikedinIcon color={indigo500} />}
                        onTouchTap={this.handleGotoLinkedin.bind(this)}
                        >
                      Linkedin Profile
                    </ListItem>
                  </List>

                  <div className="">
                    {skills}
                  </div>
              </div>
          </div>

        </div>

        <div className="col-xs-6 col-sm-6 col-md-6">
          <Paper style={styles.paper} zDepth={2}>
            <h4> Education </h4>
            <List>
            {
              profile.education_list.map((education, index)=>{
                return <Education education={education} key={index}/>
              })
            }
            </List>
          </Paper>

          <Paper style={styles.paper} zDepth={2}>
            <h4> Experience </h4>
            <List>
            {
              profile.experience_list.map((exp, index)=>{
                return <Experience experience={exp} key={index} />
              })
            }
            </List>
          </Paper>          
        </div>
      </div>
    )
  }
}

import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import TextField from 'components/TextField'
import { required } from 'utils/forms'
import classes from './OneCanComponent.scss'

import Divider from 'material-ui/Divider';
import CommunicationLocationOn from 'material-ui/svg-icons/communication/location-on';
import ActionLanguage from 'material-ui/svg-icons/action/language';
import ActionAccountBalance from 'material-ui/svg-icons/action/account-balance';
import ImageCamera from 'material-ui/svg-icons/image/camera';

import {indigo500} from 'material-ui/styles/colors';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';

export default class OneCanComponent extends Component {
  static propTypes = {
    key:PropTypes.number,
    id: PropTypes.number,
    profile: PropTypes.object
  }

  state = {
    open: this.props.open || false
  }

  render () {

    const {profile} = this.props;

    let loc = ""
    if (profile.location != undefined || profile.location != {}){
      loc = location['name']
    }

    if (profile.picture == undefined || profile.picture == ""){
      profile.picture = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzfEwtYN4OCSxxbUWDlkcyoiu9r3TErATQOYMS6If9EGPMlZoB"
    }

    return (
      <div className="one_job_container col-xs-12 col-sm-6 col-md-3-4 col-md-3">
        <Card className={classes.card_container}>
          <CardHeader
            actAsExpander={true}
            showExpandableButton={true}
          />
          
          <div className="row center-xs center-sm">
              <div className="col-xs-10 col-sm-10">
                  <img src={profile.picture} className={classes.profile_image} alt="" />
              </div>

              <h2 className={classes.name}> {profile.name} {profile.surname}</h2>
              <h4 className={classes.title}> {profile.title} </h4>

          </div>
          <List>
            <ListItem
              leftIcon={<ActionAccountBalance color={indigo500} />}
              primaryText="Industry"
              secondaryText={profile.industry}
            />
            <Divider inset={true} />
            <ListItem
              leftIcon={<ActionLanguage color={indigo500} />}
              primaryText="Language"
              secondaryText={profile.language}
            />
            <Divider inset={true} />
            <ListItem
                leftIcon={<CommunicationLocationOn color={indigo500} />}
                primaryText="Location"
                secondaryText={loc}
              />
              <Divider inset={true} />
            <ListItem
                leftIcon={<ImageCamera color={indigo500} />}
                primaryText="Score"
                secondaryText={profile.score}
              />
          </List>

          <FlatButton label="More Details" secondary={true} style={{'width': '100%'}} />

          <CardText expandable={true}>
            <div className="row">
              <div className="col-xs-4 col-sm-4">Company</div>
              <div className="col-xs-8 col-sm-8">{profile.company}</div>
              <div className="col-xs-4 col-sm-4">Hired Date</div>
              <div className="col-xs-8 col-sm-8">{profile.hiredate}</div>
            </div>
          </CardText>
        </Card>
      </div>
    )
  }
}

import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import TextField from 'components/TextField'
import { required } from 'utils/forms'
import classes from './OneProfileComponent.scss'

import Divider from 'material-ui/Divider';
import CommunicationLocationOn from 'material-ui/svg-icons/communication/location-on';
import ActionLanguage from 'material-ui/svg-icons/action/language';
import ActionAccountBalance from 'material-ui/svg-icons/action/account-balance';
import ImageCamera from 'material-ui/svg-icons/image/camera';

import {indigo500} from 'material-ui/styles/colors';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';

export default class OneProfileComponent extends Component {
  static propTypes = {
    key:PropTypes.number,
    id: PropTypes.number,
    type: PropTypes.string,
    picture: PropTypes.string,
    name: PropTypes.string,
    surname: PropTypes.string,
    company: PropTypes.string,
    hiredate: PropTypes.string,
    industry: PropTypes.string,
    location: PropTypes.object,
    url: PropTypes.string,
    title: PropTypes.string,
    language: PropTypes.string,
    score: PropTypes.number
  }

  state = {
    open: this.props.open || false
  }

  render () {

    const {location} = this.props;
    let loc = ""
    if (location != undefined || location != {}){
      loc = location['name']
    }

    return (
      <div className="one_job_container col-xs-12 col-sm-6 col-md-3-4 col-md-3">
        <Card className={classes.card_container}>
          
          <div className="row center-xs center-sm">
              <div className="col-xs-10 col-sm-10">
                  <img src={this.props.picture} className={classes.profile_image} alt="" />
              </div>

              <h2 className={classes.name}> {this.props.name} {this.props.surname}</h2>
              <h4 className={classes.title}> {this.props.title} </h4>

          </div>
          <List>
            <ListItem
              leftIcon={<ActionAccountBalance color={indigo500} />}
              primaryText="Industry"
              secondaryText={this.props.industry}
            />
            <Divider inset={true} />
            <ListItem
              leftIcon={<ActionLanguage color={indigo500} />}
              primaryText="Language"
              secondaryText={this.props.language}
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
                secondaryText={this.props.score}
              />
          </List>

          <FlatButton label="More Details" secondary={true} style={{'width': '100%'}} />

        </Card>
      </div>
    )
  }
}

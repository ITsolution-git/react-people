import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import TextField from 'components/TextField'
import { required } from 'utils/forms'
import classes from './OneJobComponent.scss'

import Divider from 'material-ui/Divider';
import CommunicationLocationOn from 'material-ui/svg-icons/communication/location-on';
import ActionLanguage from 'material-ui/svg-icons/action/language';
import ActionToday from 'material-ui/svg-icons/action/today';
import ImageCamera from 'material-ui/svg-icons/image/camera';

import {indigo500} from 'material-ui/styles/colors';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';

export default class OneJobComponent extends Component {
  static propTypes = {
    key:PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
    location: PropTypes.array,
    date: PropTypes.string,
  }

  state = {
    open: this.props.open || false
  }

  handleToNew(){
    this.props.handleNavigate()    
  }

  render () {
    const COLORS = {
      blue: '#034FC6',
      white: '#fff',
      grey: '#2A2F33',
      greyLight: '#45505a'
    };

    let loc = ''
    if (this.props.location.length > 0) {
      console.log(this.props.location)
      loc = this.props.location[0].name
    }

    return (


      <div className={classes.job_container}>
        <Card  className={classes.card_container}>
          <h2 className={classes.name}> {this.props.title}</h2>
          
          <List>
            <ListItem
                leftIcon={<CommunicationLocationOn color={indigo500} />}
                primaryText={loc}
                hoverColor={COLORS.blue}
                style={{backgroundColor: COLORS.white}}
              />
            <ListItem
                leftIcon={<ActionToday color={indigo500} />}
                primaryText={this.props.date}
                style={{backgroundColor: COLORS.white}}
              />
          </List>

          <div className="row end-xs">
            <FlatButton label="Edit" secondary={true} onClick={this.handleToNew.bind(this)} />
          </div>
        </Card>
      </div>
    )
  }
}

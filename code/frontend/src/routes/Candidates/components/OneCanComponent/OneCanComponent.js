import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import TextField from 'components/TextField'
import { required } from 'utils/forms'
import classes from './OneCanComponent.scss'
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

import Divider from 'material-ui/Divider';
import CommunicationLocationOn from 'material-ui/svg-icons/communication/location-on';
import ActionLanguage from 'material-ui/svg-icons/action/language';
import ActionAccountBalance from 'material-ui/svg-icons/action/account-balance';
import ImageCamera from 'material-ui/svg-icons/image/camera';

import {indigo500} from 'material-ui/styles/colors';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    // marginBottom: 16,
  },
};

export default class OneCanComponent extends Component {
  static propTypes = {
    key:PropTypes.number,
    id: PropTypes.number,
    profile: PropTypes.object,
    handleGotoProfileDetail: PropTypes.func,
    not_checked_id: PropTypes.number,
  }

  state = {
    open: this.props.open || false,
    checked: false
  }

  componentWillReceiveProps(nextProps){
    if(Number(nextProps.not_checked_id) == Number(this.props.id)){
      this.setState({checked: false})
    }
  }

  handleGotoProfileDetail(){
    this.props.handleGotoProfileDetail()
  }

  handleCheck(event, isChecked){
    console.log(isChecked)
    console.log(this.props.id)
    this.props.handleCheck(this.props.profile.id, isChecked)
    this.setState({checked: isChecked})
  }

  render () {

    const {profile} = this.props;

    let loc = ""
    if (profile.location != undefined || profile.location != {}){
      loc = profile.location
    }

    if (profile.picture == undefined || profile.picture == ""){
      profile.picture = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzfEwtYN4OCSxxbUWDlkcyoiu9r3TErATQOYMS6If9EGPMlZoB"
    }

    return (
      <div className="one_job_container col-xs-12 col-sm-6 col-md-3-4 col-md-3">
        <Card className={classes.card_container}>
          <Checkbox
            checked={this.state.checked}
            checkedIcon={<ActionFavorite />}
            uncheckedIcon={<ActionFavoriteBorder />}
            style={styles.checkbox}
            onCheck={this.handleCheck.bind(this)}
          />
          
          <div className="row center-xs center-sm">
              <div className="col-xs-10 col-sm-10">
                  <img src={profile.picture} className={classes.profile_image} alt="" />
              </div>

              <h2 className={classes.name}> {profile.given_name} {profile.family_name}</h2>
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
              secondaryText={profile.language_captured}
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

          <FlatButton 
            label="More Details" 
            secondary={true} 
            style={{'width': '100%'}}
            onClick={this.handleGotoProfileDetail.bind(this)} />

          
        </Card>
      </div>
    )
  }
}


// <CardHeader
//   actAsExpander={true}
//   showExpandableButton={true}
// />

// <CardText expandable={true}>
//   <div className="row">
//     <div className="col-xs-4 col-sm-4">Company</div>
//     <div className="col-xs-8 col-sm-8">{profile.company}</div>
//     <div className="col-xs-4 col-sm-4">Hired Date</div>
//     <div className="col-xs-8 col-sm-8">{profile.hiredate}</div>
//   </div>
// </CardText>
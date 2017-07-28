import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Avatar from 'material-ui/Avatar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import TextField from 'components/TextField'
import { required } from 'utils/forms'
import classes from './Education.scss'
import { darkBlack } from 'material-ui/styles/colors'

import Divider from 'material-ui/Divider';

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};


export default class EducationComponent extends Component {
  static propTypes = {
    key:PropTypes.number,
    education: PropTypes.object
  }

  state = {
    open: this.props.open || false
  }

  render () {
    const { education } = this.props
    const defaultThumbnail = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    return (
      <ListItem
        leftAvatar={<Avatar src={education.thumbnail || defaultThumbnail} />}
        primaryText={education.name}
        secondaryText={
          <p>
            <span style={{color: darkBlack}}>{education.degree}</span><br />
            {education.from} - {education.to}
          </p>
        }
        secondaryTextLines={2}
      />      
    )
  }
}

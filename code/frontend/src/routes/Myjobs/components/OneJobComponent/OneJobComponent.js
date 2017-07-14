import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'components/TextField'
import { required } from 'utils/forms'
import classes from './OneJobComponent.scss'

export default class OneJobComponent extends Component {
  static propTypes = {
    key:PropTypes.number,
    id: PropTypes.number,
    type: PropTypes.string,
    picture: PropTypes.string,
    name: PropTypes.string,
    surname: PropTypes.name,
    company: PropTypes.company,
    hiredate: PropTypes.string,
    industry: PropTypes.string,
    location: PropTypes.string,
    url: PropTypes.string,
    title: PropTypes.string,
    language: PropTypes.string,
    score: PropTypes.number
  }

  state = {
    open: this.props.open || false
  }

  render () {

    return (
      <Card className={classes.container}>
        <CardHeader
          actAsExpander={true}
          showExpandableButton={true}
        />
        
        <div className="row center-xs center-sm">
            <div className="col-xs-10 col-sm-10">
                <img src={this.props.picture} className={classes.profile_image} alt="" />
            </div>

            <h2> {this.props.name} {this.props.surname}</h2>
        </div>
        <div className="row ">

          <div className="col-xs-4 col-sm-4">Title</div>
          <div className="col-xs-8 col-sm-8">{this.props.title}</div>
          <div className="col-xs-4 col-sm-4">Industry</div>
          <div className="col-xs-8 col-sm-8">{this.props.industry}</div>
          <div className="col-xs-4 col-sm-4">Language</div>
          <div className="col-xs-8 col-sm-8">{this.props.language}</div>
          <div className="col-xs-4 col-sm-4">Location</div>
          <div className="col-xs-8 col-sm-8">{this.props.location}</div>
          <div className="col-xs-4 col-sm-4">Score</div>
          <div className="col-xs-8 col-sm-8">{this.props.score}</div>
        </div>

        <CardText expandable={true}>
          <div className="row">
            <div className="col-xs-4 col-sm-4">Company</div>
            <div className="col-xs-8 col-sm-8">{this.props.company}</div>
            <div className="col-xs-4 col-sm-4">Hired Date</div>
            <div className="col-xs-8 col-sm-8">{this.props.hiredate}</div>
          </div>
        </CardText>
      </Card>
    )
  }
}

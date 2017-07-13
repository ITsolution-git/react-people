import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import AutoComplete from 'material-ui/AutoComplete';
import { ValidatorForm, AutoCompleteValidator, TextValidator } from 'react-material-ui-form-validator';
import axios from 'axios';
import TextField from 'components/TextField'
import { required } from 'utils/forms'
import classes from './NewJobComponent.scss'
import Api from '../../apis'

const colors = [
  'Red',
  'Orange',
  'Yellow',
  'Green',
  'Blue',
  'Purple',
  'Black',
  'White',
];

@reduxForm({
  form: 'newJob'
})
export default class NewJobComponent extends Component {
  static propTypes = {
    occupations: PropTypes.array,
    soft_skills: PropTypes.array,
    hard_skills: PropTypes.array,
    profile_locations: PropTypes.array,
    profile_language_names: PropTypes.array,
    profile_language_proficiencys: PropTypes.array
  }

  state = {
    open: this.props.open || false,
    occupation: '',
    soft_skill: '',
    hard_skill:'',
    profile_location: '',
    profile_language_name:'',
    profile_language_proficiency:'',
    language:''
  }

  componentDidMount(){ }

  componentWillReceiveProps (nextProps) {
    if (nextProps.open) {
      this.setState({ open: true })
    }
  }

  close = () => {
    this.setState({ open: false })
  }

  handleUpdateJobTitle = (searchText) => {
    this.setState({
      occupation: searchText,
    });
  };

  handleUpdateSoftSkills = (searchText) => {
    this.setState({
      soft_skill: searchText,
    });
  };

  handleUpdateHardSkills = (searchText) => {
    this.setState({
      hard_skill: searchText,
    });
  };

  handleUpdateProfileLocation = (searchText) => {
    this.props.handleLocation(searchText)
    this.setState({
      profile_location: searchText,
    });
  };

  handleUpdateProfileLanguageName = (searchText) => {
    this.setState({
      profile_language_name: searchText,
    });
  };

  handleSubmit = () => {

  }

  handleLanguageChange = (event, index, value) => this.setState({language: value});

  render () {
    const { open } = this.state
    // const { handleSubmit } = this.props

    const actions = [
      <RaisedButton
        label='Cancel'
        secondary
      />,
      <RaisedButton
        label='Create'
        type='submit'
        onClick={this.handleSubmit}
        className={classes.createbutton}
        primary
      />
    ]

    return (
      <Card className={classes.container}>
        <CardTitle title="New Job Description" subtitle="JDW" />
          <ValidatorForm 
            ref="form" 
            className={classes.form} 
            onSubmit={this.handleSubmit}
            onError={errors => console.log(errors)}>
            <div className="row">                
                <div className="col-xs-12 col-sm-7">
                   <AutoCompleteValidator
                      name="occupation"
                      floatingLabelText="Job Title"
                      searchText={this.state.occupation}
                      onUpdateInput={this.handleUpdateJobTitle}
                      maxSearchResults={4}
                      dataSource={this.props.occupations}
                      filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
                      fullWidth={true}
                      validators={['required']}
                      errorMessages={['this field is required']}
                    />
                </div>
                <div className="col-xs-12 col-sm-offset-1 col-sm-4">
                  <SelectField
                    floatingLabelText="Language"
                    value={this.state.language}
                    onChange={this.handleLanguageChange}
                    fullWidth={true}
                  >
                    <MenuItem value={null} primaryText="" />
                    <MenuItem value={'english'} primaryText="English" />
                    <MenuItem value={'german'} primaryText="German" />
                  </SelectField>
                </div>

                <div className="col-xs-12 col-sm-12">
                   <AutoCompleteValidator
                      name="soft_skill"
                      floatingLabelText="Soft Skills"
                      searchText={this.state.soft_skill}
                      onUpdateInput={this.handleUpdateSoftSkills}
                      maxSearchResults={4}
                      dataSource={this.props.soft_skills}
                      filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
                      fullWidth={true}
                      validators={['required']}
                      errorMessages={['this field is required']}
                    />
                </div>

                <div className="col-xs-12 col-sm-12">
                   <AutoCompleteValidator
                      name="hard_skill"
                      floatingLabelText="Hard Skills"
                      searchText={this.state.hard_skill}
                      onUpdateInput={this.handleUpdateHardSkills}
                      maxSearchResults={4}
                      dataSource={this.props.hard_skills}
                      filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
                      fullWidth={true}
                      validators={['required']}
                      errorMessages={['this field is required']}
                    />
                </div>

                <div className="col-xs-12 col-sm-12">
                   <AutoCompleteValidator
                      name="profile_location"
                      floatingLabelText="Profile Location"
                      searchText={this.state.profile_location}
                      onUpdateInput={this.handleUpdateProfileLocation}
                      maxSearchResults={4}
                      dataSource={this.props.profile_locations}
                      filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
                      fullWidth={true}
                      validators={['required']}
                      errorMessages={['this field is required']}
                    />
                </div>
                <div className="col-xs-12 col-sm-7">
                  <AutoCompleteValidator
                      name="profile_language_name"
                      floatingLabelText="Profile Language Name"
                      searchText={this.state.profile_language_name}
                      onUpdateInput={this.handleUpdateProfileLanguageName}
                      maxSearchResults={4}
                      dataSource={this.props.profile_language_names}
                      filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
                      fullWidth={true}
                      validators={['required']}
                      errorMessages={['this field is required']}
                    />
                </div>

                <div className="col-xs-12 col-sm-offset-1 col-sm-4">
                  <AutoCompleteValidator
                      name="profile_language_proficiency"
                      floatingLabelText="Proficiency level"
                      searchText={this.state.profile_language_proficiency}
                      onUpdateInput={this.handleUpdateProfileProficiency}
                      maxSearchResults={4}
                      dataSource={this.props.profile_language_proficiencys}
                      filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
                      fullWidth={true}
                      validators={['required']}
                      errorMessages={['this field is required']}
                    />                  
                </div>

                <div className="col-xs-12 col-sm-12">
                  <div className={classes.buttongroup}>
                    {actions}
                  </div>
                </div>
              </div>
          </ValidatorForm>        
      </Card>      
    )
  }
}

import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ActionGrade from 'material-ui/svg-icons';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import AutoComplete from 'material-ui/AutoComplete';
import { ValidatorForm, AutoCompleteValidator, TextValidator,SelectValidator } from 'react-material-ui-form-validator';
import ChipInput from 'material-ui-chip-input'
import axios from 'axios';
import TextField from 'components/TextField'
import { required } from 'utils/forms'
import classes from './NewJobComponent.scss'
import TagAutoCompleteValidator from 'components/TagAutoCompleteValidator'
import Api from '../../apis'

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
  }

  state = {
    open: this.props.open || false,
    occupation: '',
    soft_skill: '',
    soft_skills: [],
    hard_skill:'',
    profile_location: '',
    profile_language_name:'',
    profile_language_proficiency:'',
    language:'en'
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
    this.props.handleChangeJobTitle(this.state.language, searchText)
    this.setState({
      occupation: searchText,
    });
  };

  handleUpdateSoftSkills = (searchText) => {
    this.props.handleChangeSoftSkills(this.state.language, searchText)
    this.setState({
      soft_skill: searchText,
    });
  };

  handleUpdateHardSkills = (searchText) => {
    this.props.handleChangeHardSkills(this.state.language, searchText)
    this.setState({
      hard_skill: searchText,
    });
  };

  handleUpdateProfileLocation = (searchText) => {
    this.props.handleLocation(this.state.language, searchText)
    this.setState({
      profile_location: searchText,
    });
  };

  handleUpdateProfileLanguageName = (searchText) => {
    this.props.handleChangeProfileLanguage(this.state.language, searchText)
    this.setState({
      profile_language_name: searchText,
    });
  };

  handleSubmit = () => {

  }

  handleLanguageChange = (event, index, value) => {
    this.setState({language: value})
    this.props.handleChangeLang(value);
  }

  handleUpdateProfileProficiency = (event, index, value) => {
    this.setState({profile_language_proficiency: value})
  }

  handleUpdateSoftSkillsTag = (searchText) => {
    this.props.handleChangeSoftSkills(this.state.language, searchText)
    let data = this.state.soft_skills;
    data.push(searchText);
    this.setState({
      soft_skills: data,
    });
  }

  handleAfterAddedTagSoft = () => {
    this.setState({soft_skill: ''})
  }

  handleAfterAddedTagHard = () => {
    this.setState({hard_skill: ''})
  }

  render () {
    const { open } = this.state
    // const { handleSubmit } = this.props

    const actions = [
      <RaisedButton
        label='Tell People'
        secondary
      />,
      <RaisedButton
        label='Save'
        type='submit'
        onClick={this.handleSubmit}
        className={classes.createbutton}
        primary
      />
    ]

    return (
      <Card className={classes.container}>
          <div className="row">
            <div className="col-xs-12 col-sm-7">
              <CardTitle title="New Job Description" subtitle="JDW" />
            </div>
            <div className="col-xs-12 col-sm-offset-1 col-sm-4">
              <SelectField
                floatingLabelText="Language of Job Description"
                value={this.state.language}
                onChange={this.handleLanguageChange}
                fullWidth={true}
              >
                <MenuItem value={null} primaryText="" />
                <MenuItem value={'en'} primaryText="English" />
                <MenuItem value={'de'} primaryText="German" />
              </SelectField>
            </div>
          </div>
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
                      animated={false}
                      menuCloseDelay={100}
                      searchText={this.state.occupation}
                      onUpdateInput={this.handleUpdateJobTitle}
                      maxSearchResults={8}
                      dataSource={this.props.occupations}
                      filter={(searchText, key) => (key.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)}
                      fullWidth={true}
                      value={this.state.occupation}
                      validators={['required']}
                      errorMessages={['This field is required']}
                    />
                </div>
                <div className="col-xs-12 col-sm-offset-1 col-sm-4">
                  
                </div>

                <div className="col-xs-12 col-sm-12">
                   <TagAutoCompleteValidator                  
                    name="soft_skill"
                    defTags={this.props.soft_skills}
                    sourceTags={this.props.soft_skills}
                    textField={{floatingLabelText:"Soft Skills", maxSearchResults:8}}
                    searchText={this.state.soft_skill}
                    value={this.state.soft_skill}
                    onChange={this.handleUpdateSoftSkills.bind(this)}
                    onAdd={this.handleAfterAddedTagSoft.bind(this)}
                    validators={['required']}
                    errorMessages={['This field is required']}
                  />
                </div>                

                <div className="col-xs-12 col-sm-12">
                   <TagAutoCompleteValidator
                      name="hard_skill"
                      textField={{floatingLabelText:"Hard Skills", maxSearchResults:8}}
                      searchText={this.state.hard_skill}
                      defTags={this.props.hard_skills}
                      sourceTags={this.props.hard_skills}
                      onChange={this.handleUpdateHardSkills.bind(this)}
                      onAdd={this.handleAfterAddedTagHard.bind(this)}
                      value={this.state.hard_skill}
                      validators={['required']}
                      errorMessages={['This field is required']}
                    />
                </div>

                <div className="col-xs-12 col-sm-12">
                   <AutoCompleteValidator
                      name="profile_location"
                      floatingLabelText="Profile Location"
                      searchText={this.state.profile_location}
                      onUpdateInput={this.handleUpdateProfileLocation}
                      maxSearchResults={8}
                      dataSource={this.props.profile_locations}
                      filter={(searchText, key) => (key.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)}
                      fullWidth={true}
                      validators={['required']}
                      value={this.state.profile_location}
                      errorMessages={['This field is required']}
                    />
                </div>
                <div className="col-xs-12 col-sm-7">
                  <AutoCompleteValidator
                      name="profile_language_name"
                      floatingLabelText="The talend should speak"
                      searchText={this.state.profile_language_name}
                      onUpdateInput={this.handleUpdateProfileLanguageName}
                      maxSearchResults={8}
                      dataSource={this.props.profile_language_names}
                      filter={(searchText, key) => (key.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)}
                      fullWidth={true}
                      value={this.state.profile_language_name}
                      validators={['required']}
                      errorMessages={['This field is required']}
                    />
                </div>

                <div className="col-xs-12 col-sm-offset-1 col-sm-4">
                    <SelectValidator
                      floatingLabelText="Proficiency level"
                      name="profile_language_proficiency"
                      value={this.state.profile_language_proficiency}
                      onChange={this.handleUpdateProfileProficiency}
                      fullWidth={true}
                      validators={['required']}
                      errorMessages={['This field is required']}
                    >
                      <MenuItem value={'Elementary'} primaryText="Elementary" />
                      <MenuItem value={'Limited'} primaryText="Limited" />
                      <MenuItem value={'Professional'} primaryText="Professional" />
                      <MenuItem value={'Fluent'} primaryText="Fluent" />
                      <MenuItem value={'Native or Bilingual'} primaryText="Native or Bilingual" />
                    </SelectValidator>
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

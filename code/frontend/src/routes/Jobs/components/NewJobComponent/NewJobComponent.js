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
import { apiGetJobTitle } from '../../apis'

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
  static propTypes = {}

  state = {
    open: this.props.open || false,
    occupation: '',
    soft_skills: '',
    hard_skills:'',
    profile_location: '',
    profile_language_name:'',
    profile_language_proficiency:'',
    language:''
  }

  createLabelsJobTitle(data) {
    let resData = data.map((item) => {
      return {
          value: item.id,
          label: item.preferred_label
      }
    });
    return resData;
  }

  componentDidMount(){
    console.log("fetch", fetch)
    fetch('https://www.janzz.jobs/japi/concepts?search_lang=all&output_lang=en&branch=occupation&q=Projekt%20Manager', {
      method: 'GET',
      mode: 'cors',
      headers: new Headers({          
        'Authorization': 'Token 480713dc16970b8f29af174b1b09c476132360e036fd8423e9cf22680f44ac6230394074899de501',
        'Access-Control-Allow-Origin':'*',
      })
    })
    .then(res => {
        let occupation = this.createLabelsJobTitle(res.data);
        that.setState({occupation: occupation});
    });
  }

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
      soft_skills: searchText,
    });
  };

  handleUpdateHardSkills = (searchText) => {
    this.setState({
      hard_skills: searchText,
    });
  };

  handleUpdateProfileLocation = (searchText) => {
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
                      dataSource={colors}
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
                  >
                    <MenuItem value={null} primaryText="" />
                    <MenuItem value={'english'} primaryText="English" />
                    <MenuItem value={'german'} primaryText="German" />
                  </SelectField>
                </div>

                <div className="col-xs-12 col-sm-12">
                   <AutoCompleteValidator
                      name="soft_skills"
                      floatingLabelText="Soft Skills"
                      searchText={this.state.soft_skills}
                      onUpdateInput={this.handleUpdateSoftSkills}
                      maxSearchResults={4}
                      dataSource={colors}
                      filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
                      fullWidth={true}
                      validators={['required']}
                      errorMessages={['this field is required']}
                    />
                </div>

                <div className="col-xs-12 col-sm-12">
                   <AutoCompleteValidator
                      name="hard_skills"
                      floatingLabelText="Hard Skills"
                      searchText={this.state.soft_skills}
                      onUpdateInput={this.handleUpdateHardSkills}
                      maxSearchResults={4}
                      dataSource={colors}
                      filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
                      fullWidth={true}
                      validators={['required']}
                      errorMessages={['this field is required']}
                    />
                </div>

                <div className="col-xs-12 col-sm-12">
                   <AutoCompleteValidator
                      name="location"
                      floatingLabelText="Profile Location"
                      searchText={this.state.profile_location}
                      onUpdateInput={this.handleUpdateProfileLocation}
                      maxSearchResults={4}
                      dataSource={colors}
                      filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
                      fullWidth={true}
                      validators={['required']}
                      errorMessages={['this field is required']}
                    />
                </div>
                <div className="col-xs-12 col-sm-7">
                  <AutoCompleteValidator
                      name="location"
                      floatingLabelText="Profile Language Name"
                      searchText={this.state.profile_language_name}
                      onUpdateInput={this.handleUpdateProfileLanguageName}
                      maxSearchResults={4}
                      dataSource={colors}
                      filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
                      fullWidth={true}
                      validators={['required']}
                      errorMessages={['this field is required']}
                    />
                </div>

                <div className="col-xs-12 col-sm-offset-1 col-sm-4">
                  <TextValidator
                      floatingLabelText="Proficiency level "
                      name="profile_language_proficiency"
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

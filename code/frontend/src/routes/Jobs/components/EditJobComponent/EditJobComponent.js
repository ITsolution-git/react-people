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
import classes from './EditJobComponent.scss'
import TagAutoCompleteValidator from 'components/TagAutoCompleteValidator'
import TagAutoComplete from 'components/TagAutoComplete'
import Api from '../../apis'


@reduxForm({
  form: 'newJob'
})
export default class EditJobComponent extends Component {
  static propTypes = {
    key: PropTypes.number,
    occupations: PropTypes.array,
    soft_skills: PropTypes.array,
    hard_skills: PropTypes.array,
    def_soft_skills: PropTypes.array,
    def_hard_skills: PropTypes.array,
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
    profile_location_id: '',
    profile_language_name:'',
    profile_language_proficiency:'',
    language:'en'
  }

  componentWillMount() {
  }

  componentDidMount(){
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.occupation != nextProps.occupations[0]) {
      if (nextProps.occupations.length == 1){
        console.log("==============================")
        console.log(nextProps)
        this.setState({
          occupation: nextProps.occupations[0],
          profile_location: nextProps.profile_locations[0].text,
          profile_location_id: nextProps.profile_locations[0].value,
          profile_language_name: nextProps.profile_language_names[0].label,
          profile_language_proficiency: nextProps.profile_language_proficiencys[0].text
        })          
      }
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
    let body = {
      "contract_type_list": [],
      "description": null,
      "education_list": [],
      "function_list": [],
      "industry_list": [],
      "janzz_id": 1234,
      "janzz_updated": null,
      "keyword_list": [],
      "language_captured": null,
      "language_list": [],
      "location_list": [],
      "occupation": "1st job test",
      "skill_list": [],
      "softskill_list": [],
      "specialization_list": [],
      "title": null,
      "unique_id": null,
      "id": this.props.id
    }

    body.occupation = this.state.occupation
    body.language_captured = this.state.language

    body.location_list.push({
      "name":this.state.profile_location,
      "place_id": this.state.profile_location_id
    })
    
    this._hard_skill.getTags().forEach((tag) => {
      body.skill_list.push({
        "skill":tag.label,
        "level": 1
      })
    });
    this._soft_skill.getTags().forEach((tag) => {
      body.softskill_list.push({
        "skill":tag.label,
        "level": 1
      })
    });
    body.language_list.push({
      "name":this.state.profile_language_name,
      "proficiency":this.state.profile_language_proficiency,
      "proficiency2": this.state.profile_language_proficiency
    })

    console.log(body)
    this.props.handlePostJob(body)
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

    console.log("fdsafdsafdsa", this._hard_skill)
  }

  handleOccupationNewRequest = (searchText, index) => {
    console.log("searchText ", this.state.language)

    this.setState({occupation: searchText.text})
    this.props.handleOccupationForSoftSkill(this.state.language, searchText.text);
    this.props.handleOccupationForHardSkill(this.state.language, searchText.text);
  }

  handleLocationNewRequest = (searchText, index) => {

    this.setState({
        profile_location: searchText.text,
        profile_location_id: searchText.value})
  }


  handleLanguageNewRequest = (searchText, index) => {
   console.log(searchText)
   this.setState({profile_language_name: searchText.text}) 
  }
 
  handleGotoTalent() {
    this.props.handleFindTalent()
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
        label='Find Talent'
        className={classes.findtalent}
        onClick={this.handleGotoTalent.bind(this)}
        primary
      />,
      <RaisedButton
        label='Save'
        type='submit'
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
                      onNewRequest={this.handleOccupationNewRequest}
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
                   <AutoCompleteValidator
                      name="profile_location"
                      floatingLabelText="Profile Location"
                      searchText={this.state.profile_location}
                      onUpdateInput={this.handleUpdateProfileLocation}
                      maxSearchResults={8}
                      dataSource={this.props.profile_locations}
                      filter={(searchText, key) => (key.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)}
                      onNewRequest={this.handleLocationNewRequest}
                      fullWidth={true}
                      validators={['required']}
                      value={this.state.profile_location}
                      errorMessages={['This field is required']}
                    />
                </div>

                <div className="col-xs-12 col-sm-12">
                   <TagAutoComplete
                      name="hard_skill"
                      textField={{floatingLabelText:"Hard Skills", maxSearchResults:8}}
                      searchText={this.state.hard_skill}
                      defTags={this.props.def_hard_skills}
                      sourceTags={this.props.hard_skills}
                      onChange={this.handleUpdateHardSkills.bind(this)}
                      onAdd={this.handleAfterAddedTagHard.bind(this)}
                      value={this.state.hard_skill}
                      ref={(ref) => this._hard_skill = ref}
                    />
                </div>

                <div className="col-xs-12 col-sm-12">
                   <TagAutoComplete                  
                    name="soft_skill"
                    defTags={this.props.def_soft_skills}
                    sourceTags={this.props.soft_skills}
                    textField={{floatingLabelText:"Soft Skills", maxSearchResults:8}}
                    searchText={this.state.soft_skill}
                    value={this.state.soft_skill}
                    onChange={this.handleUpdateSoftSkills.bind(this)}
                    onAdd={this.handleAfterAddedTagSoft.bind(this)}
                    ref={(ref) => this._soft_skill = ref}
                  />
                </div> 

                <div className="col-xs-12 col-sm-7">
                  <AutoCompleteValidator
                      name="profile_language_name"
                      floatingLabelText="The talent should speak"
                      searchText={this.state.profile_language_name}
                      onUpdateInput={this.handleUpdateProfileLanguageName}
                      maxSearchResults={8}
                      dataSource={this.props.profile_language_names}
                      filter={(searchText, key) => (key.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)}
                      onNewRequest={this.handleLanguageNewRequest}
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
                      <MenuItem value={0} primaryText="Elementary" />
                      <MenuItem value={1} primaryText="Limited" />
                      <MenuItem value={2} primaryText="Professional" />
                      <MenuItem value={3} primaryText="Fluent" />
                      <MenuItem value={4} primaryText="Native or Bilingual" />
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

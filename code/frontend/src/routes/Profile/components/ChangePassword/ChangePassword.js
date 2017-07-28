import React, { PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { Field, reduxForm } from 'redux-form'
import TextField from 'components/TextField'
import { required, validateEmail } from 'utils/forms'
import { SIGNUP_FORM_NAME } from 'constants'
import classes from './ChangePassword.scss'

import Paper from 'material-ui/Paper';
const buttonStyle = { width: '100%' }

var textInput = ''
var newpwd = ''

const ChangePassword = ({ handleChangePassword, submitting, handleCheckOldPassword, checkOldPwd, message, changeOldKey }) => {

  const selfCheckOldPassword = (e) => {
    handleCheckOldPassword(textInput)
  }

  const selfChangeOldKey = (e) => {
    textInput = e.target.value
    changeOldKey()
  }

  const selfChangeNewKey = (e) => {
    newpwd = e.target.value
  }

  const selfUpdateNewKey = (e) => {
    debugger
    handleChangePassword(newpwd)
  }

  return (
    <div className="row center-xs center-sm center-md">
      <div className="col-xs-10 col-sm-10 col-md-10">
        <Paper zDepth={1}>
          <h4 style={{paddingTop: '1rem', float: "left", paddingLeft: "1rem"}}>Change Password</h4>
          <form className={classes.container}>
            <label className={classes.label}>{message}</label>
            <Field
              name='old_password'
              component={TextField}
              label='Old Password'
              type="password"
              validate={[required]}
              onChange={(e)=>selfChangeOldKey(e)}
            /><br/>
            <div className={classes.submit}>
              <RaisedButton
                label='Check Old Password'
                secondary
                disabled={submitting}
                onClick={e => selfCheckOldPassword(e)}
              />
            </div>
            <Field
              name='new_password'
              component={TextField}
              label='New Password'
              type='password'
              disabled={checkOldPwd}
              validate={[required]}
              onChange={(e)=>selfChangeNewKey(e)}
            /><br/>
            <div className={classes.submit}>
              <RaisedButton
                label='Update Password'
                primary
                disabled={checkOldPwd}
                onClick={e => selfUpdateNewKey(e)}
              />
            </div>
          </form>
        </Paper>
      </div>
    </div>
  )
}

ChangePassword.propTypes = {
  handleSubmit: PropTypes.func,
  checkOldPwd: PropTypes.bool,
  handleChangePassword: PropTypes.func,
  handleCheckOldPassword: PropTypes.func,
  message: PropTypes.string,
  changeOldKey: PropTypes.func
}

export default reduxForm({
  form: 'ChangePassword'
})(ChangePassword)

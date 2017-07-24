import React, { Component, PropTypes } from 'react'
import classes from './Navbar.scss'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import {
  firebaseConnect,
  pathToJS,
  isLoaded,
  isEmpty
} from 'react-redux-firebase'
import {
  LIST_PATH,
  JOB_PATH,
  ACCOUNT_PATH,
  LOGIN_PATH,
  SIGNUP_PATH,
  MY_JOB_PATH,
  PROFILE_DETAIL_PATH
} from 'constants'

// Components
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import DownArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import Avatar from 'material-ui/Avatar'
import defaultUserImage from 'static/User.png'

const buttonStyle = {
  color: 'white',
  textDecoration: 'none',
  alignSelf: 'center',
  marginRight: '1rem'
}

const avatarStyles = {
  wrapper: { marginTop: 0 },
  button: { marginRight: '.5rem', width: '200px', height: '64px' },
  buttonSm: { marginRight: '2rem', cursor: 'pointer' }
}

@firebaseConnect()
@connect(
  ({ firebase }) => ({
    authError: pathToJS(firebase, 'authError'),
    auth: pathToJS(firebase, 'auth'),
    account: pathToJS(firebase, 'profile')
  })
)
export default class Navbar extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    account: PropTypes.object,
    firebase: PropTypes.object.isRequired
  }

  state = {
    openLogin: false,
    openJob:false
  }

  handleLoginMenuTouchTap = (event) => {
    // This prevents ghost click.
    this.setState({
      openLogin: true,
      anchorEl: event.currentTarget,
    });
  };

  handleJobMenuTouchTap = (event) => {
    // This prevents ghost click.
    this.setState({
      openJob: true,
      anchorEl: event.currentTarget,
    });
  };

  handleLoginMenuRequestClose = () => {
    this.setState({
      openLogin: false,
      openJob: false
    });
  };

  handleGotoNewJob = () => {
    this.context.router.push(JOB_PATH)
    this.handleLoginMenuRequestClose()
  }

  handleGotoMyJob = () => {
    this.context.router.push(MY_JOB_PATH)
    this.handleLoginMenuRequestClose()
  }

  handleGotoProfile = () => {
    this.context.router.push(PROFILE_DETAIL_PATH)
    this.handleLoginMenuRequestClose()
  }


  handleLogout = () => {
    this.props.firebase.logout()
    this.context.router.push('/')
    this.handleLoginMenuRequestClose() 
  }

  render () {
    const { account } = this.props
    const accountExists = isLoaded(account) && !isEmpty(account)

    const iconButton = (
      <IconButton style={avatarStyles.button} disableTouchRipple>
        <div className={classes.avatar}>
          <div className='hidden-mobile'>
            <Avatar
              src={accountExists && account.avatarUrl ? account.avatarUrl : defaultUserImage}
            />
          </div>
          <div className={classes['avatar-text']}>
            <span className={`${classes['avatar-text-name']} hidden-mobile`}>
              { accountExists && account.displayName ? account.displayName : 'User' }
            </span>
            <DownArrow color='white' />
          </div>
        </div>
      </IconButton>
    )

    const mainMenu = (
      <div className={classes.menu}>
        <Link to={SIGNUP_PATH}>
          <FlatButton
            label='Sign Up'
            style={buttonStyle}
          />
        </Link>
        <Link to={LOGIN_PATH}>
          <FlatButton
            label='Login'
            style={buttonStyle}            
          />
        </Link>
      </div>
    )

    const rightMenu = accountExists ? (
      <div>
        <div className={classes.avatar}>          
          <div className={classes['avatar-text']}>
            <FlatButton 
              label="Jobs" 
              style={buttonStyle}
              onTouchTap={this.handleJobMenuTouchTap} />
          </div>
          <div className='hidden-mobile'>
            <Avatar
              src={accountExists && account.avatarUrl ? account.avatarUrl : defaultUserImage}
              onTouchTap={this.handleLoginMenuTouchTap}
              style={avatarStyles.buttonSm}
            />
          </div>          
        </div>
        
        <Popover
          open={this.state.openLogin}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'middle', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'middle', vertical: 'top'}}
          onRequestClose={this.handleLoginMenuRequestClose}
        >
          <Menu>
            <MenuItem primaryText="Profile" onTouchTap={this.handleGotoProfile.bind(this)} />
            <MenuItem primaryText="Sign out" onTouchTap={this.handleLogout.bind(this)}/>
          </Menu>
        </Popover>
        
        <Popover
          open={this.state.openJob}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleLoginMenuRequestClose}
        >
          <Menu>
            <MenuItem primaryText="New Job" onTouchTap={ this.handleGotoNewJob.bind(this) } />
            <MenuItem primaryText="My Jobs" onTouchTap={ this.handleGotoMyJob.bind(this) }/>
            <MenuItem primaryText="My Posting"/>
          </Menu>
        </Popover>
      </div>
    ) : mainMenu

    return (
      <AppBar
        title={
          <Link to={accountExists ? `${LIST_PATH}` : '/'} className={classes.brand}>
            Tao People
          </Link>
        }
        showMenuIconButton={false}
        iconElementRight={rightMenu}
        iconStyleRight={accountExists ? avatarStyles.wrapper : {}}
        className={classes.appBar}
      />
    )
  }
}


// <IconMenu
//     iconButtonElement={iconButton}
//     targetOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//     anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
//     animated={false}
//   >
//     <MenuItem
//       primaryText='Account'
//       onTouchTap={() => this.context.router.push(ACCOUNT_PATH)}
//     />
//     <MenuItem
//       primaryText='Sign out'
//       onTouchTap={this.handleLogout}
//     />
//   </IconMenu>
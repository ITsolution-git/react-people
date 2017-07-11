// EXAMPLE ONLY! THIS FILE IS USUALLY NOT PART OF GIT TRACKING
// .gitignore skips this at the project level, but it is added for example here

export const firebase = {
  apiKey: 'AIzaSyCuJ6Q4R_gki046rem94y8Mb4T_jO4ZlX4',
  authDomain: 'gleaming-idiom-167311.firebaseapp.com',
  databaseURL: 'https://gleaming-idiom-167311.firebaseio.com',
  storageBucket: 'gleaming-idiom-167311.appspot.com',
  projectId: "gleaming-idiom-167311",
  messagingSenderId: "138059995471"
}

// Config for react-redux-firebase
// For more details, visit https://prescottprue.gitbooks.io/react-redux-firebase/content/config.html
export const reduxFirebase = {
  userProfile: 'users', // root that user profiles are written to
  enableLogging: false, // enable/disable Firebase Database Logging
  updateProfileOnLogin: false // enable/disable updating of profile on login
  // profileDecorator: (userData) => ({ email: userData.email }) // customize format of user profile
}

export const env = 'development'

export default { firebase, reduxFirebase, env }

import { JOB_PATH as path } from 'constants'
import Job from './routes/Job'

export default (store) => ({
  path,
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Jobs = require('./containers/JobContainer').default

      /*  Return getComponent   */
      cb(null, Jobs)

    /* Webpack named bundle   */
    }, 'Jobs')
  },
  childRoutes: [
    Job // not function for sync route
    // async routes definitions require function here i.e. Project(store)
  ]
})

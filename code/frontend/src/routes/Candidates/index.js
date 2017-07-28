import { LONG_LIST_PATH as path } from 'constants'
import Detail from './routes/Detail'

export default (store) => ({
  path,
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const candidates = require('./containers/CandidateContainer').default

      /*  Return getComponent   */
      cb(null, candidates)

    /* Webpack named bundle   */
    }, 'Candidates')
  },
  childRoutes: [
    Detail // not function for sync route
    // async routes definitions require function here i.e. Project(store)
  ]
})

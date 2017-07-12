import React, { PropTypes } from 'react'
import classes from './Job.scss'

export const Job = ({ jobs, params: { jobname } }) => (
  <div className={classes.container}>
  </div>
)

Job.propTypes = {
  jobs: PropTypes.object,
  params: PropTypes.object.isRequired
}

export default Job

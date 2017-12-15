const JobQueue = require('../../common/job_queue')

module.exports = async (jobName, args, cb) => {
  await JobQueue.createJob(jobName, args)
  await JobQueue.processJob(jobName, cb)
}
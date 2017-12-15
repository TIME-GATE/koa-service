/**
 * 后台任务队列
 */
const kue = require('kue')
const config = require('../config')

const queuePrefix = `job:queue:${config.NODE_ENV}`

const queue = kue.createQueue({
  prefix: queuePrefix,
  redis: config.database.redis
})

queue.watchStuckJobs()

queue.active((err, ids) => {
  ids.forEach((id) => {
    kue.Job.get(id, (err, job) => {
      if(err) console.error(Object.assign(err, { message: 'kue load error'}))
      if(job) job.inactive()
    })
  })
})

queue.on('job enqueue', (id, type) => {
  console.log(`Job ${id} got queued of type ${type}`)
})

queue.on('job complete', (id) => {
  kue.Job.get(id, (err, job) => {
    if(!err) {
      job.remove((err) => {
        if(err) throw err
        console.log(`######## Removed completed $${job.type} with id ${job.id} ########\n`)
      })
    }
  })
})

queue.on('error', (err) => {
  err.message = '################### JOB:executing queue error ###################'
  console.log(err)
})

queue.on('failed', (err) => {
  err.message = '################### JOB:executing queue failed ###################'
  console.log(err)
})

const createJob = (jobName, args = {}, priority = 'normal') => {
  queue.create(jobName, args)
  .priority(priority)
  .ttl(3600)
  .save()
}

module.exports.createJob = createJob
module.exports.processJob = (jobName, cb) => {
  queue.process(jobName, async (job, done) => {
    console.log(`###################JOB:${job.type}: IS IN PROCESS ###################`)
    const result = await cb(job.data, done)
    if(result.code) {
      console.log(`###################JOB:${job.type}: IS FAILED AND ATTEMPTS ###################`)
      job.attempts(3).backoff(true)
    }
  })
}
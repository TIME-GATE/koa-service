const apm = require('../common/apm_profiler')()

setInterval(() => {
  apm.compareSnap()
  apm.printMemInfo()
}, 3000)
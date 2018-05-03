const apm = require('../common/apm_profiler')()

setInterval(() => {
  apm.compareSnap()
  apm.printMemInfo()
  // apm.printHeapdump()
}, 3000)
const profiler = require('v8-profiler')

class Apm {
  constructor() {
    this.beforeSnap = profiler.takeSnapshot(1, true)
    this.afterSnap = profiler.takeSnapshot(2, true)
  }

  printMemInfo() {
    console.log('snapshot_header:', this.beforeSnap.getHeader(), this.afterSnap.getHeader())
  }

  compareSnap() {
    console.log('snapshot_compare:', this.beforeSnap.compare(this.afterSnap))
  }

}

module.exports = () => {
  return new Apm()
}
// can be used to keep process alive or docker container running.

function endlessProcess() {
  process.nextTick(endlessProcess)
} // Readable solution but it utilizes all available CPU. https://stackoverflow.com/questions/39082527/how-to-prevent-the-nodejs-event-loop-from-exiting
function setInterval({ interval = 1000 } = {}) {
  console.log(`Executing interval in ${__filename}. NodeJS version: ${JSON.stringify(process.versions)}`)
  setInterval(() => console.info('Sleeping...'), interval)
}
const setTimeout = ({ timeout = 10000 } = {}) => setTimeout(() => console.log('setTimeout command ended. The process will exit now.'), timeout)

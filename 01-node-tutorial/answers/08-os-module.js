const os = require("os");
const user = os.userInfo();
console.log("User Info:", user);
console.log(`The system uptime is ${os.uptime()} seconds`);
const currentOS = {
  type: os.type(),
  release: os.release(),
  arch: os.arch(),
  homeDir: os.homedir(),
  hostname: os.hostname(),
  tmpDir: os.tmpdir(),
};
console.log("Operating System Info:", currentOS);
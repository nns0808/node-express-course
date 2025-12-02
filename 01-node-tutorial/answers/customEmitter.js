const EventEmitter = require("events");

const emitter = new EventEmitter();


emitter.on("start", (msg) => {
  console.log("Start event received:", msg);
  
  emitter.emit("process", "Processing started");
});


emitter.on("process", (msg) => {
  console.log("Process event:", msg);
});


setInterval(() => {
  emitter.emit("timer", "It's time for a break!");
}, 3000);

emitter.on("timer", (msg) => {
  console.log(msg);
});


const waitForEvent = () => {
  return new Promise((resolve) => {
    emitter.on("finish", (msg) => resolve(msg));
  });
};

const doWait = async () => {
  const msg = await waitForEvent();
  console.log("We got the 'finish' event! Message:", msg);
};

doWait();


emitter.emit("start", "Let's begin!");


setTimeout(() => {
  emitter.emit("finish", "All done!");
}, 5000);

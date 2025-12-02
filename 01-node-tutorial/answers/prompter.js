const http = require("http");
const { StringDecoder } = require("string_decoder");

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};
// here, you could declare one or more variables to store what comes back from the form.

let color = "lightblue";

// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.

const form = () => {
  return `
  <body style="background-color:${color}; font-family:Comic Sans MS, Comic Sans, cursive; text-align:center; padding-top:80px;">
    <h1>Color Chooser</h1>
    <p>Current background color: <strong>${color}</strong></p>
    <form method="POST">
      <label for="color">Pick a color:</label>
      <select name="color" id="color">
        <option value="white">White</option>
        <option value="red">Red</option>
        <option value="orange">Orange</option>
        <option value="yellow">Yellow</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
        <option value="purple">Purple</option>
        <option value="pink">Pink</option>
      </select>
      <br><br>
      <button type="submit">Change Color</button>
    </form>
  </body>
  `;
};

const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);

  if (req.method === "POST") {
    getBody(req, (body) => {
      console.log("The body of the post is ", body);
      if (body["color"]) {
        color = body["color"];
      }
      res.writeHead(303, { Location: "/" });
      res.end();
    });
  } else {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(form());
  }
});

server.on("request", (req) => {
  console.log("event received: ", req.method, req.url);
});

server.listen(3000);
console.log("The server is listening on port 3000.");

// testing nodemon auto-restart

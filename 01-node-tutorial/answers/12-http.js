const http = require("http");

const server = http.createServer((req, res) => {
  console.log(`Request for ${req.url}`);

  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Welcome to my Home Page!</h1>");
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>About Us: This is the About page.</h1>");
  } else if (req.url === "/contact") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Contact Page: Reach us at contact@example.com</h1>");
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 Page Not Found</h1>");
  }
});


server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

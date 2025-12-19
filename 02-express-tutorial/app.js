console.log('Express Tutorial')

const express = require("express");
const app = express();
const { products, people } = require("./data");
const peopleRouter = require("./routes/people");
const cookieParser = require("cookie-parser");
const auth = (req, res, next) => {
  const { name } = req.cookies;

  if (name) {
    req.user = name;
    next();
  } else {
    res.status(401).json({ message: "unauthorized" });
  }
};

const port = 3000;

const logger = (req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`${req.method} ${req.url} — ${time}`);
  next();
};
app.use(logger);
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/people", peopleRouter);



// Example of using logger for a single route:
// app.get("/", logger, (req, res) => {
//   res.send("Home Page");
// });

app.get("/", (req, res) => {
  res.send("Home Page");
});



app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});

app.get("/api/v1/products", (req, res) => {
  res.json(products);
});


app.get("/api/v1/query", (req, res) => {
  let { search, limit, regex, maxPrice } = req.query;
  let filteredProducts = [...products];

  // Filter by name starting with search (case-insensitive)
  if (search) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().startsWith(search.toLowerCase())
    );
  }

  // Filter by regex on product name
  if (regex) {
    try {
      const re = new RegExp(regex, "i");
      filteredProducts = filteredProducts.filter((product) => 
        re.test(product.name)
      );
    } catch (err) {
      return res.status(400).json({ message: "Invalid regular expression" });
    }
  }

  // Filter by maxPrice
  if (maxPrice) {
    const max = parseFloat(maxPrice);
    if (!isNaN(max)) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= max
      );
    }
  }

  // Limit number of results
  if (limit) {
    const lim = parseInt(limit);
    if (!isNaN(lim)) {
      filteredProducts = filteredProducts.slice(0, lim);
    }
  }

  res.json(filteredProducts);
});

// Product by ID
app.get("/api/v1/products/:productID", (req, res) => {
  const idToFind = parseInt(req.params.productID);

  const product = products.find((p) => p.id === idToFind);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});


// cookie
app.get("/setcookie", (req, res) => {
  res.cookie("name", "Natalia", { httpOnly: true });
  res.send("Cookie has been set");
});

app.get("/getcookie", (req, res) => {
  res.json({ cookies: req.cookies });
});




app.post("/logon", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Please provide a name" });
  }

  res.cookie("name", name, { httpOnly: true, maxAge: 1000 * 60 * 60 }); // 1 hour cookie
  res.status(201).json({ message: `Hello, ${name}!` });
});


app.delete("/logoff", (req, res) => {
  res.clearCookie("name");
  res.status(200).json({ message: "You are logged off" });
});


app.get("/test", auth, (req, res) => {
  res.status(200).json({ message: `Welcome, ${req.user}!` });
});


// Not found
app.all("*", (req, res) => {
  res.status(404).send("Not found");
});

app.listen(port, () => {
  console.log("Express Tutorial");
});


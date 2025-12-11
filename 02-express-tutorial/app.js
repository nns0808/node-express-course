console.log('Express Tutorial')

const express = require("express");
const app = express();
const { products } = require("./data");
const port = 3000;

app.use(express.static("./public"));


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
      filteredProducts = filteredProducts.filter((product) => re.test(product.name));
    } catch (err) {
      return res.status(400).json({ message: "Invalid regular expression" });
    }
  }

  // Filter by maxPrice
  if (maxPrice) {
    const max = parseFloat(maxPrice);
    if (!isNaN(max)) {
      filteredProducts = filteredProducts.filter((product) => product.price <= max);
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

// app.get("/api/v1/products/:productID", (req, res) => {
//   res.json(req.params);
// });

// Searching and limiting products using query params
app.get("/api/v1/query", (req, res) => {
  let { search, limit } = req.query;
  let filteredProducts = [...products];

  if (search) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().startsWith(search.toLowerCase())
    );
  }

  if (limit) {
    limit = parseInt(limit);
    filteredProducts = filteredProducts.slice(0, limit);
  }

  res.json(filteredProducts);
});


app.get("/api/v1/products/:productID", (req, res) => {
  const idToFind = parseInt(req.params.productID);

  const product = products.find((p) => p.id === idToFind);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});


app.all("*", (req, res) => {
  res.status(404).send("Not found");
});

app.listen(port, () => {
  console.log("Express Tutorial");
});

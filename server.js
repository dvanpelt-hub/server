// Makes it possible to use and manage the environmental variables we establish //
require("dotenv").config();
// Creates and initializes the express app, and assigns it to our designated PORT //
const express = require("express");
const cors = require("cors");
const db = require("./db");
const morgan = require("morgan");
const app = express();
const cors = require("cors");

app.use(cors());

app.use(cors());
app.use(morgan("dev"));

// Converts data in 'body' of request to a json var called body //
app.use(express.json());

// Get all stocks //
app.get("/api/v1/stocks", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM stock_holdings");
    res.status(200).json({
      status: "got all stocks",
      results: results.rows.length,
      holdings: {
        stocks: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Get a single stock //
app.get("/api/v1/stocks/:id", async (req, res) => {
  try {
    const results = await db.query(
      "SELECT * FROM stock_holdings WHERE id = $1",
      // Get id from the params in the call, paramaterized query //
      [req.params.id]
    );
    res.status(200).json({
      status: "got one stock",
      results: results.rows.length,
      holdings: {
        stock: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Create a position (stock review) //
app.post("/api/v1/stocks/", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO stock_holdings (ticker_symbol, recommendation_status, stock_value, posting, purchase_price) VALUES ($1, $2, $3, $4, $5) returning *",
      [
        req.body.ticker_symbol,
        req.body.recommendation_status,
        req.body.stock_value,
        req.body.posting,
        req.body.purchase_price,
      ]
    );
    res.status(201).json({
      status: "created",
      holdings: {
        stock: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Update a stock review //
app.put("/api/v1/stocks/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE stock_holdings SET ticker_symbol = $1, recommendation_status = $2, stock_value = $3 WHERE id = $4 RETURNING *",
      [
        req.body.ticker_symbol,
        req.body.recommendation_status,
        req.body.stock_value,
        req.params.id,
      ]
    );
    res.status(200).json({
      status: "updated",
      holdings: {
        stock: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Delete a stock review //
app.delete("/api/v1/stocks/:id", async (req, res) => {
  try {
    const results = await db.query("DELETE FROM stock_holdings WHERE id = $1", [
      req.params.id
    ])
    res.status(204).json({
      status: "deleted",
    });
  } catch (err) {
    console.log(err);
  }
});

// Use env variable, else use PORT 3002 //
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is up and listening on PORT ${PORT}`);
});

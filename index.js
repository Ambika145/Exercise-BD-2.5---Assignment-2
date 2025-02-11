const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all origins
app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

let stocks = [
  {
    id: 1,
    name: 'reliance industries',
    price: 2500,
    growth: 3.5,
    industry: 'finance',
    exchange: 'nse',
  },
  {
    id: 2,
    name: 'hdfc bank',
    price: 1800,
    growth: 4.2,
    industry: 'finance',
    exchange: 'bse',
  },
  {
    id: 3,
    name: 'icici bank',
    price: 1600,
    growth: 5.1,
    industry: 'finance',
    exchange: 'nse',
  },
  {
    id: 4,
    name: 'tata consultancy services',
    price: 1900,
    growth: 2.9,
    industry: 'finance',
    exchange: 'bse',
  },
  {
    id: 5,
    name: 'infosys',
    price: 2900,
    growth: 3.8,
    industry: 'finance',
    exchange: 'nse',
  },
  {
    id: 6,
    name: "dr. reddy's laboratories",
    price: 2100,
    growth: 4.7,
    industry: 'pharma',
    exchange: 'bse',
  },
  {
    id: 7,
    name: 'sun pharmaceutical',
    price: 2300,
    growth: 3.2,
    industry: 'pharma',
    exchange: 'nse',
  },
  {
    id: 8,
    name: 'cipla',
    price: 2100,
    growth: 2.6,
    industry: 'pharma',
    exchange: 'bse',
  },
  {
    id: 9,
    name: 'ntpc',
    price: 1200,
    growth: 4.1,
    industry: 'power',
    exchange: 'nse',
  },
  {
    id: 10,
    name: 'power grid corporation',
    price: 1500,
    growth: 3.4,
    industry: 'power',
    exchange: 'bse',
  },
];

// Endpoint 1: Get stocks sorted by pricing
app.get('/stocks/sort/pricing', (req, res) => {
  let { order } = req.query;
  order = order?.toLowerCase() === 'desc' ? 'desc' : 'asc'; // Default to 'asc' if invalid
  let sortedStocks = [...stocks].sort((a, b) =>
    order === 'desc' ? b.price - a.price : a.price - b.price
  );
  res.json({ stocks: sortedStocks });
});

//  Endpoint 2: Get stocks sorted based on Growth
app.get('/stocks/sort/growth', (req, res) => {
  let { order } = req.query;
  order = order?.toLowerCase() === 'desc' ? 'desc' : 'asc';
  let sortedStocks = [...stocks].sort((a, b) =>
    order === 'desc' ? b.growth - a.growth : a.growth - b.growth
  );
  res.json({ stocks: sortedStocks });
});

// Endpoint 3: Filter stocks based on Exchange (NSE/BSE)
app.get('/stocks/filter/exchange', (req, res) => {
  let { exchange } = req.query;
  if (!exchange)
    return res
      .status(400)
      .json({ error: "Missing 'exchange' query parameter" });
  let filteredStocks = stocks.filter(
    (stock) => stock.exchange.toLowerCase() === exchange.toLowerCase()
  );
  res.json({ stocks: filteredStocks });
});

//  Endpoint 4: Filter stocks based on Industry (Finance/Pharma/Power)
app.get('/stocks/filter/industry', (req, res) => {
  let { industry } = req.query;
  if (!industry)
    return res
      .status(400)
      .json({ error: "Missing 'industry' query parameter" });
  let filteredStocks = stocks.filter(
    (stock) => stock.industry.toLowerCase() === industry.toLowerCase()
  );
  res.json({ stocks: filteredStocks });
});

//  Endpoint 5: Get all stocks
app.get('/stocks', (req, res) => {
  res.json({ stocks });
});

// Start server
app.listen(port, () => {
  console.log(` Server running on http://localhost:${port}`);
});

const express = require('express');
const app = express();
const port = 3000;

app.get('/status', (req, res) => {
  res.json({ status: 'Server is up and running!' });
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});

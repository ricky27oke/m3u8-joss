const express = require('express');
const request = require('request');
const app = express();

app.get('/proxy', (req, res) => {
  const targetUrl = req.query.url;
  const referer = req.query.referer || '';
  const userAgent = req.query.ua || 'Mozilla/5.0';

  if (!targetUrl) return res.status(400).send('Missing url parameter');

  const options = {
    url: targetUrl,
    headers: {
      'Referer': referer,
      'User-Agent': userAgent
    }
  };

  request(options).pipe(res);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy listening on port ${port}`);
});

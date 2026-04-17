const https = require('https');
https.get('https://upload.wikimedia.org/wikipedia/en/thumb/e/ef/Embark_Oklahoma_City_logo.svg/512px-Embark_Oklahoma_City_logo.svg.png', (res) => {
  console.log(res.statusCode);
});

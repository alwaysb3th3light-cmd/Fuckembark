import https from 'https';

https.get('https://upload.wikimedia.org/wikipedia/en/e/ef/Embark_Oklahoma_City_logo.svg', {
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log(data));
});

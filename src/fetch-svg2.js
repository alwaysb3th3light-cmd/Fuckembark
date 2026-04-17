import https from 'https';

https.get('https://upload.wikimedia.org/wikipedia/commons/3/3c/EMBARK_wordmark.svg', {
  headers: { 'User-Agent': 'Mozilla/5.0' }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log(data));
});

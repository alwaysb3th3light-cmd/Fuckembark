import https from 'https';
import fs from 'fs';
https.get('https://en.wikipedia.org/wiki/Embark_(transit_authority)', {
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => fs.writeFileSync('wiki.html', data));
});

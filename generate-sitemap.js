const fs = require('fs');

const domains = {
  'https://wishes.inc': [
    '/', '/about-us', '/success-stories', '/home', '/how-it-works', '/ai-strategy',
    '/business', '/non-profits', '/donors'
  ],
  'https://wishes.gives': ['/non-profits'],
  'https://wishes.fund': ['/donors'],
  'https://wishespay.com': ['/business'],
};

function generateSitemap(domain, routes) {
  const urls = routes.map(route => `${domain}${route}`);

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `
  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;
}

for (const [domain, routes] of Object.entries(domains)) {
  const sitemapContent = generateSitemap(domain, routes);
  const fileName = domain.replace(/https?:\/\//, '').replace(/\./g, '_') + '_sitemap.xml';
  fs.writeFileSync(`./dist/${fileName}`, sitemapContent); 
  console.log(`✅ Sitemap для ${domain} создан: dist/${fileName}`);
}

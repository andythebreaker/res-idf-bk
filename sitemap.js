const regex = /\<loc\>(.+)\<\/loc\>/gm;
const regex2 = /\<priority\>(.+)\<\/priority\>/gm;
var op = "";
var ps = [];
const str = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
<!-- created with Free Online Sitemap Generator www.xml-sitemaps.com -->


<url>
  <loc>https://library.math.ncku.edu.tw/</loc>
  <lastmod>2022-03-01T07:57:22+00:00</lastmod>
  <priority>1.00</priority>
</url>
<url>
  <loc>https://library.math.ncku.edu.tw/?page=0</loc>
  <lastmod>2022-03-01T07:57:22+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://library.math.ncku.edu.tw/inner?id=621dbab586d39441029b9bf6&amp;pid=621dba9a86d39441029b9bf2&amp;ic=l</loc>
  <lastmod>2022-03-01T07:57:22+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://library.math.ncku.edu.tw/inner?id=$(__</loc>
  <lastmod>2022-03-01T07:57:22+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://library.math.ncku.edu.tw/inner?id=621db9ff86d39441029b9bdb&amp;pid=621db9ea86d39441029b9bd7&amp;ic=l</loc>
  <lastmod>2022-03-01T07:57:22+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://library.math.ncku.edu.tw/users/login</loc>
  <lastmod>2022-03-01T07:57:22+00:00</lastmod>
  <priority>0.80</priority>
</url>


</urlset>`;
let m;
var i = 0;
while ((m = regex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
        regex.lastIndex++;
    }

    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
        console.log(`Found match, group ${groupIndex}: ${match}`);
        if (groupIndex === 1) {
            op += `smStream.write({ url: '${match.replace('https://library-official-website.herokuapp.com', '')}',  changefreq: 'monthly', priority: @${i}@ });`
        }
    });
    i++;
}
let m2;
var i2 = 0;
while ((m2 = regex2.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m2.index === regex2.lastIndex) {
        regex2.lastIndex++;
    }

    // The result can be accessed through the `m`-variable.
    m2.forEach((match2, groupIndex2) => {
        console.log(`Found match, group ${groupIndex2}: ${match2}`);
        if (groupIndex2 === 1) {
            var re = new RegExp(`@${i2}@`, "gm");

            var subst = match2;

            // The substituted value will be contained in the result variable
            op = op.replace(re, subst);

            console.log('Substitution result: ', op);
        }
    });
    i2++;
}
console.log(op);

const outputDir = "./static-ghost";
const siteUrl = "http://localhost:2368/";

console.log(`Removing output directory: ${outputDir}`);
var fs = require("fs-extra");
fs.removeSync(outputDir);

console.log(`Analysing site at ${siteUrl}`);
var scrape = require("website-scraper");
var options = {
  urls: [siteUrl],
  directory: outputDir,
  //scrape posts, not just index
  recursive: true,
  sources: [
    { selector: "img", attr: "src" },
    //most images are displayed using background-image
    { selector: "header.site-header", attr: "style" },
    { selector: "figure.post-full-image", attr: "style" },
    { selector: "div.post-card-image", attr: "style" },
    //find stylesheets
    { selector: 'link[rel="stylesheet"]', attr: "href" },
    //and any scripts used
    { selector: "script", attr: "src" },
    //shortcut icon
    { selector: 'link[rel="shortcut icon"]', attr: "href" }
  ],
  //dont scrape external sites
  urlFilter: function(url) {
    return url.indexOf(siteUrl) === 0;
  }
};

scrape(options)
  .then(() => {
    console.log(`Static site generated under here: ${outputDir}`);
  })
  .catch(console.log);

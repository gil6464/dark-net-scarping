const torRequest = require("tor-request");
const cheerio = require("cheerio");
const { pastesURL } = require("./PastesURLScraper");
const Paste = require("./Models/Paste");
const { Model } = require("mongoose");

//* Go to each paste URL, and collect his relevant data.

const scrape = () =>
  pastesURL().then(result => {
    result.forEach((url, i) => {
      torRequest.request(url, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          const paste = new Paste({});
          const $ = cheerio.load(body);
          paste.title = $(".col-sm-5").text().trim();
          paste.text = $(".text").text().trim();
          const metadata = $(".col-sm-6").text().trim();
          paste.author = metadata.split(" ")[2];
          const time = new Date(metadata.split(" ").slice(4, 8));
          paste.time = new Date(time)
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");

          try {
            paste.save().then(console.log("saved"));
          } catch (error) {
            console.log("error", error);
          }

          return paste;
        }
      });
    });
  });

module.exports = { scrape };

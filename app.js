const torRequest = require("tor-request");
const cheerio = require("cheerio");
const { pastesURL } = require("./PastesURLScraper");
const Paste = require("./Models/Paste");
const { Model } = require("mongoose");

//* Go to each paste URL, and collect his relevant data.

const scrape = async () => {
  console.log("Scrape Start");

  const latestPaste = await getLatestPaste();
  let count = 0;
  pastesURL().then(result => {
    result.forEach((url, i) => {
      torRequest.request(url, (error, response, body) => {
        //* For each iterate i add to count one, and when he equal to result length, so he tell me when scrape is over.
        count++;
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

          //* Check if correct paste is newer then the latest paste that saved in the DB

          if (latestPaste.getTime() < paste.time.getTime()) {
            try {
              paste.save().then(console.log("Saved"));
            } catch (error) {
              console.log(error);
            }
          }
        }
        if (count === result.length) {
          console.log("Scraping is over!");
        }
      });
    });
  });
};

async function getLatestPaste() {
  let latestPaste = await Paste.findOne({}).sort([["time", -1]]);
  //* If DB is empty, i return a old date, to be sure to collect all pastes.
  if (latestPaste == undefined) {
    const time = new Date(2020 - 01 - 01);
    return time;
  } else {
    return latestPaste.time;
  }
}

module.exports = { scrape };

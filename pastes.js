const torRequest = require("tor-request");
const cheerio = require("cheerio");

const { scrape } = require("./scrape");
function createPastes() {
  scrape().then(result => {
    const listOfPastes = [];
    return result.map(url => {
      torRequest.request(url, (error, response, body) => {
        const paste = {};
        if (!error && response.statusCode === 200) {
          const $ = cheerio.load(body);
          paste.title = $(".col-sm-5").text().trim();
          paste.text = $(".text").text().trim();
          const metadata = $(".col-sm-6").text().trim();
          if (metadata[0] === "P") {
            paste.author = metadata.split(" ")[2];
            const time = new Date(metadata.split(" ").slice(4, 8));
            paste.time = new Date(time)
              .toISOString()
              .slice(0, 19)
              .replace("T", " ");
            listOfPastes.push(paste);
          }
        }
      });
      return listOfPastes;
    });
  });
}

const pastes = async () => {
  return await createPastes();
};
console.log(pastes);

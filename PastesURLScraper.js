const cheerio = require("cheerio");
const torRequest = require("tor-request");
const strongHoldUrl = "http://nzxj65x32vh2fkhk.onion/all";

//* This function returns array of URL of each paste, go page by page until she getn an error, and collect urls.

async function pastesURL() {
  let pageNum = 1;
  const forumPastesUrls = [];
  while (true) {
    try {
      const pageHTML = await getPageHTML(pageNum);
      const pagePastesURLs = collectPasteUrls(pageHTML);
      if (pagePastesURLs.length === 0) break;
      forumPastesUrls.push(...pagePastesURLs);

      pageNum++;
    } catch (error) {
      console.log(error);
      break;
    }
  }
  return forumPastesUrls;
}

//* This function recive page num, and returns page html.

function getPageHTML(pageNum) {
  const pageUrl = `${strongHoldUrl}?page=${pageNum}`;

  return new Promise((resolve, reject) => {
    torRequest.request(pageUrl, (error, response, body) => {
      if (error) reject(error);
      resolve(body);
    });
  });
}

//* This function recive html page, collect and return each address of paste.

function collectPasteUrls(pageHTML) {
  const pasteURLS = [];
  const $ = cheerio.load(pageHTML);

  $("a.btn.btn-success").each((i, element) => {
    const pasteURL = $(element).attr("href");
    pasteURLS.push(pasteURL);
  });
  return pasteURLS;
}

module.exports = { pastesURL };

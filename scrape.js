//* Step one- get html page for each page, one by one.
//* Step two -collect each paste URL
//* get request for each paste URL, and collect paste data.
const cheerio = require("cheerio");
const { response } = require("express");
const express = require("express");
const torRequest = require("tor-request");
const strongHoldUrl = "http://nzxj65x32vh2fkhk.onion/all";

async function scrape() {
  let pageNum = 1;
  const forumPastesUrls = [];
  while (true) {
    //* Get page html
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

    //* Check if page if exists
    //* Collect each paste URL.
    //* Go to next page.
  }
  console.log(forumPastesUrls);
  //* with forumPastesUrls and map enter each paste and collect his data

  //* const pastesPromises = forumPastesUrls.map(pasteUrl => {
  //*   return getPastePageHTML(pasteUrl).
  // *   then(HTML => {
  // *        return getPasteFromHTML(HTML)
  //*     })
  // *})
  //* return Promise.all(pastesPromises);
}
scrape();
function getPageHTML(pageNum) {
  const pageUrl = `${strongHoldUrl}?page=${pageNum}`;
  console.log(pageUrl);

  return new Promise((resolve, reject) => {
    torRequest.request(pageUrl, (error, response, body) => {
      if (error) reject(error);
      resolve(body);
    });
  });
}

function collectPasteUrls(pageHTML) {
  const pasteURLS = [];
  const $ = cheerio.load(pageHTML);

  $("a.btn.btn-success").each((i, element) => {
    const pasteURL = $(element).attr("href");
    pasteURLS.push(pasteURL);
  });
  return pasteURLS;
}

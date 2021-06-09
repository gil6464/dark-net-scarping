const cheerio = require("cheerio");
const express = require("express");
const puppeteer = require("puppeteer");
const torRequest = require("tor-request");
const PORT = 3000;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  torRequest.request(
    "http://nzxj65x32vh2fkhk.onion/all",
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const $ = cheerio.load(body);

        const pastes = [];
        $(".col-sm-5").each((i, element) => {
          const title = $(element).text().trim();
          pastes.push({ title, i });
        });
        $(".col-sm-12").each((i, element) => {
          const content = $(element).text().trim();
          if (pastes.length > i) {
            pastes[i + 1].content = content;
          }
        });
        res.send(pastes);
      } else {
        console.log(error);
        res.send("There was a problem with our server");
      }
    }
  );
});

// app.get("/", async (req, res) => {
//   const broswer = await puppeteer.launch({
//     headless: false,
//     args: ["--proxy-server=socks5://127.0.0.1:9050", "--no-sandbox"],
//   });
//   const page = await broswer.newPage();
//   await page.goto("http://nzxj65x32vh2fkhk.onion/all");
//   const content = await page.content();
//   const $ = await cheerio.load(content);
//   const pastes = [];
//   $(".col-sm-5").each((i, element) => {
//     const title = $(element).text().trim();
//     pastes.push({ title, i });
//   });
//   $(".col-sm-6").each((i, element) => {
//     const content = $(element).text().trim();
// console.log(content, i);
//     if (pastes.length > i) {
//       pastes[i].content = content.trim();
//     }
//   });

//   broswer.close();
//   res.send(pastes);
// });

app.listen(PORT, () => {
  console.log("App running on PORT", PORT);
});

const cheerio = require("cheerio");
const express = require("express");
const torRequest = require("tor-request");
const PORT = 3000;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  let listOfItems = [];
  torRequest.request(
    "http://nzxj65x32vh2fkhk.onion/all",
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const $ = cheerio.load(body);
        $(".col-sm-5").each((i, element) => {
          const item = $(element).text().trim();
          listOfItems.push(item);
          console.log(listOfItems);
        });
        res.send(listOfItems);
      } else {
        console.log(error);
        res.send("There was a problem with our server");
      }
    }
  );
});

app.listen(PORT, () => {
  console.log("App running on PORT", PORT);
});

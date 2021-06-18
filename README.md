# dark-net-scarping!

## About the scraper:

This app collect posts from the "StrongHold Paste" that in the dark net.

### Technologies:
To get into the dark net, my app used in the tor-request to get into the website and cheerio to collect the text from each HTML element.
In additon i used in Docker to build a proxy of port 9050 that tor-request needs.

The scraper runs automatically every two minutes, checks if there are new paste to collect, and if needed saving in the DB.

### About the project:
This project is a task in Cyber4s program, in collaboration with IntSights company, that guild us during the task 

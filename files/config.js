'use strict';

angular.module('portfolioConfig', []);

angular.module('portfolioConfig').value('config', {
  "google-analytics-tracking-id": "abc",
  "title": "Benjamin Borbe",
  "subtitle": "Fotografie",
  "subtext": "die Spass macht",
  "images": [
    "images/start/image1.jpg",
    "images/start/image2.jpg",
    "images/start/image3.jpg"
  ],
  "navi": [
    {
      "href": "https://500px.com/ben",
      "name": "Portfolio"
    },
    {
      "href": "mailto:bborbe@rocketnews.de",
      "name": "Kontakt"
    }
  ],
  "subnavi": [
    {
      "href": "https://blog.benjamin-borbe.de/impressum/",
      "name": "Impressum"
    }
  ]
});



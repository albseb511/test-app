//import Airtable from 'airtable'
var Airtable = require('airtable');

var base = new Airtable({apiKey: 'keyxjWTbfhVKdNIva'}).base('appYgCzT4je4lJQUb');

base('TestTable').update("reccBuDWNHEUYliDA", {
    "Date": "2019-06-29",
    "Value": "240"
  }, function(err, record) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(record.get('Date'));
  });